const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const Fastify = require("fastify");
const websocket = require("@fastify/websocket");

// Initialize Firebase Admin
initializeApp();

// Firestore References
const firestore = getFirestore();

// Collections Constants
const COLLECTIONS = {
  SUBMISSIONS: "submissions",
  VOTES: "votes",
  MUTATION_HISTORY: "mutation_history",
};

/**
 * Calculate weighted vote score for a submission
 * @param {Object} submission - The submission object
 * @return {number} Weighted vote score
 */
function calculateVoteWeight(submission) {
  const baseScore = submission.votes || 0;
  const timeBonus = Math.max(
      1 - (Date.now() - submission.createdAt) / (1000 * 60 * 60 * 24 * 7),
      0.1,
  );
  return baseScore * timeBonus;
}

/**
 * Cloud Function for Daily Leaderboard Purge
 */
exports.dailyLeaderboardPurge = onSchedule("every 24 hours", async (event) => {
  const submissionsRef = firestore.collection(COLLECTIONS.SUBMISSIONS);
  const snapshot = await submissionsRef.orderBy("weightedScore", "asc").get();

  const totalSubmissions = snapshot.size;
  const purgeLimit = Math.floor(totalSubmissions * 0.2);

  const batch = firestore.batch();
  snapshot.docs.slice(0, purgeLimit).forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
});

// Fastify WebSocket Server for Realtime Updates
const fastify = Fastify();
fastify.register(websocket);

/**
 * WebSocket endpoint for leaderboard updates
 */
fastify.get("/leaderboard", { websocket: true }, (connection) => {
  connection.socket.on("message", async () => {
    try {
      const leaderboard = await getLeaderboard();
      connection.socket.send(JSON.stringify(leaderboard));
    } catch (error) {
      console.error("Leaderboard fetch error:", error);
    }
  });
});

/**
 * Fetch top 100 submissions by weighted score
 * @return {Array} Array of top submissions
 */
async function getLeaderboard() {
  const snapshot = await firestore
      .collection(COLLECTIONS.SUBMISSIONS)
      .orderBy("weightedScore", "desc")
      .limit(100)
      .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * API Endpoint for Item Submission
 */
exports.submitItem = onRequest(async (req, res) => {
  try {
    const { content, userId } = req.body;

    const submission = {
      content,
      userId,
      createdAt: Date.now(),
      votes: 0,
      weightedScore: 0,
    };

    const docRef = await firestore
        .collection(COLLECTIONS.SUBMISSIONS)
        .add(submission);
    res.json({ id: docRef.id, ...submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API Endpoint for Voting on Submissions
 */
exports.voteOnSubmission = onRequest(async (req, res) => {
  try {
    const { submissionId, userId, weight } = req.body;

    const submissionRef = firestore
        .collection(COLLECTIONS.SUBMISSIONS)
        .doc(submissionId);
    const submissionDoc = await submissionRef.get();

    if (!submissionDoc.exists) {
      return res.status(404).json({ error: "Submission not found" });
    }

    const voteRecord = {
      submissionId,
      userId,
      weight,
      timestamp: Date.now(),
    };

    // Record vote in votes collection
    await firestore.collection(COLLECTIONS.VOTES).add(voteRecord);

    // Update submission's vote count and weighted score
    const submission = submissionDoc.data();
    const updatedVotes = (submission.votes || 0) + weight;
    const updatedWeightedScore = calculateVoteWeight({
      ...submission,
      votes: updatedVotes,
    });

    await submissionRef.update({
      votes: updatedVotes,
      weightedScore: updatedWeightedScore,
    });

    res.json({
      success: true,
      votes: updatedVotes,
      weightedScore: updatedWeightedScore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export Fastify WebSocket Handler
exports.api = onRequest(fastify.handler);
