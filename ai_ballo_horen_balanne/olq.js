const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "olq",
    desc: "Generate a question based on the selected topic.",
    alias: ["question", "quiz"],
    category: "education",
    react: "📝",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, args, q, reply }) => {
    try {
        // List of topics
        const topics = ["maths", "science", "history", "geography", "literature"];
        
        // Check if a topic is provided
        if (!q || !topics.includes(q.toLowerCase())) {
            return reply(`Please select a topic from the following:\n${topics.map((topic, index) => `${index + 1}. ${topic}`).join('\n')}`);
        }

        // React to show processing
        await m.react("🔍");

        // Step 1: Generate a question based on the selected topic
        const topic = q.toLowerCase();
        const apiResponse = await axios.get(`https://thenux-q-api.vercel.app/generate-question?topic=${topic}`, {
            timeout: 10000
        });

        // Validate API response
        if (!apiResponse.data || !apiResponse.data.question) {
            await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
            return reply("Failed to generate a question. Please try again.");
        }

        const questionData = apiResponse.data;

        // Prepare the question message
        let questionMessage = `**${questionData.question}**\n\n`;
        questionData.options.forEach((option, index) => {
            questionMessage += `**${String.fromCharCode(65 + index)}.** ${option}\n`;
        });

        questionMessage += `\n*Reply with the option letter (A, B, C, D) to answer.*`;

        // Send the question
        await conn.sendMessage(from, {
            text: questionMessage,
            quoted: mek
        });

        // Create a handler for the answer selection
        const handleAnswerSelection = async (answerUpdate) => {
            const answerMessage = answerUpdate.messages[0];
            if (!answerMessage.message) return;

            // Check if this is a reply to our question message
            const isReplyToQuestion = answerMessage.message.extendedTextMessage?.contextInfo?.stanzaId === mek.key.id;

            if (!isReplyToQuestion) return;

            // Extract selected answer
            const selectedAnswer = answerMessage.message.conversation || answerMessage.message.extendedTextMessage?.text;

            // Validate answer
            if (!["A", "B", "C", "D"].includes(selectedAnswer.toUpperCase())) {
                await conn.sendMessage(from, {
                    react: { text: "❌", key: answerMessage.key }
                });
                return reply("Invalid selection. Please reply with A, B, C, or D.");
            }

            // Check if the answer is correct
            const correctAnswer = questionData.answer;
            if (selectedAnswer.toUpperCase() === correctAnswer) {
                await conn.sendMessage(from, {
                    react: { text: "✅", key: answerMessage.key }
                });
                await reply("🎉 Correct answer! Well done!");
            } else {
                await conn.sendMessage(from, {
                    react: { text: "❌", key: answerMessage.key }
                });
                await reply(`❌ Incorrect answer. The correct answer is **${correctAnswer}**.`);
            }

            // Remove event listener
            conn.ev.off("messages.upsert", handleAnswerSelection);
        };

        // Listen for answer selection
        conn.ev.on("messages.upsert", handleAnswerSelection);

    } catch (error) {
        console.error("Error processing question command:", error);
        await reply("An error occurred while processing your request. Please try again.");
    }
});
