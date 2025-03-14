const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "olq",
    desc: "Generate a question based on a selected topic.",
    alias: ["generatequestion", "topicquestion"],
    category: "quiz",
    react: "📝",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, args, reply }) => {
    try {
        // Ask the user for a topic
        const topics = [
            "ICT",
            "Maths",
            "Science",
            "History",
            "Geography",
           "Sinhala",
"Budhist",
"" //  Thava dpnko mona hari
        ];

        let topicMessage = "📚 Please select a topic by replying with the corresponding number:\n\n";
        topics.forEach((topic, index) => {
            topicMessage += `${index + 1}. ${topic}\n`;
        });

        // Send the topic selection message
        await conn.sendMessage(from, {
            text: topicMessage,
            footer: "Reply with the number of your chosen topic."
        }, { quoted: mek });

        // Create a handler for topic selection
        const handleTopicSelection = async (topicUpdate) => {
            const topicMessage = topicUpdate.messages[0];
            if (!topicMessage.message) return;

            // Extract the user's selected topic
            const userSelection = topicMessage.message.conversation || topicMessage.message.extendedTextMessage?.text;
            const selectedIndex = parseInt(userSelection) - 1;

            // Validate selection
            if (selectedIndex < 0 || selectedIndex >= topics.length) {
                await conn.sendMessage(from, {
                    react: { text: "❌", key: topicMessage.key }
                });
                return reply("❌ Invalid selection. Please choose a valid number from the list.");
            }

            const selectedTopic = topics[selectedIndex];

            // React to the topic selection
            await conn.sendMessage(from, {
                react: { text: "✅", key: topicMessage.key }
            });

            // Step 2: Fetch the question based on the selected topic
            const questionResponse = await axios.get(`https://thenux-q-api.vercel.app/generate-question?topic=${encodeURIComponent(selectedTopic)}`);

            // Validate question response
            if (!questionResponse.data || !questionResponse.data.question) {
                return reply("❌ Failed to fetch the question. Please try again.");
            }

            const questionData = questionResponse.data;

            // Prepare the question message
            let questionMessage = `**${questionData.question}**\n\n`;
            questionData.options.forEach((option, index) => {
                questionMessage += `(${String.fromCharCode(65 + index)}) ${option}\n`;
            });

            // Send the question to the user
            await conn.sendMessage(from, {
                text: questionMessage,
                footer: "Reply with the letter corresponding to your answer (A, B, C, or D)."
            });

            // Create a handler for answer selection
            const handleAnswerSelection = async (answerUpdate) => {
                const answerMessage = answerUpdate.messages[0];
                if (!answerMessage.message) return;

                // Extract the user's answer
                const userAnswer = answerMessage.message.conversation || answerMessage.message.extendedTextMessage?.text;

                // Validate the answer
                if (!["A", "B", "C", "D"].includes(userAnswer.toUpperCase())) {
                    await conn.sendMessage(from, {
                        react: { text: "❌", key: answerMessage.key }
                    });
                    return reply("❌ Invalid answer. Please reply with A, B, C, or D.");
                }

                // Check if the answer is correct
                const correctAnswer = questionData.answer;
                if (userAnswer.toUpperCase() === correctAnswer) {
                    await conn.sendMessage(from, {
                        react: { text: "✅", key: answerMessage.key }
                    });
                    return reply("🎉 Correct answer! Well done!");
                } else {
                    await conn.sendMessage(from, {
                        react: { text: "❌", key: answerMessage.key }
                    });
                    return reply(`❌ Incorrect answer. The correct answer is: ${correctAnswer}.`);
                }
            };

            // Listen for answer selection
            conn.ev.on("messages.upsert", handleAnswerSelection);
        };

        // Listen for topic selection
        conn.ev.on("messages.upsert", handleTopicSelection);

    } catch (error) {
        console.error("Error generating question:", error);
        await reply("❌ An error occurred while generating the question. Please try again.");
    }
});
