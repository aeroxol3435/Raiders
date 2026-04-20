const mineflayer = require('mineflayer')
const express = require('express')

// ================== CONFIG ==================
const host = 'lapatasmp.aternos.me'   // ← CHANGE THIS TO YOUR EXAROTON IP/DOMAIN
const port = 25565                    // Usually 25565 on Exaroton
// const version = '1.21'             // Uncomment and change if your server needs a specific version
// ===========================================

const botNames = [
  "arjun_plays",
  "krish_op",
  "dev_gamer",
  "ayaan_mc",
  "vivaan_op",
  "rishi_plays",
  "omkar_gaming",
  "shiv_op",
  "aditya_mc",
  "harsh_plays",
  "veer_gamer",
  "laksh_op",
  "dhruv_mc",
  "samar_plays",
  "arnav_gamer",
  "tanay_op",
  "arush_mc",
  "neel_plays",
  "pratham_gamer",
  "ayush_op",
  "vihaan_mc",
  "kush_plays",
  "rudra_gamer",
  "yash_op",
  "manav_mc",
  "reyaan_plays",
  "kabir_gamer",
  "shaurya_op",
  "krunal_mc",
  "arin_plays"
]

const bots = []

function createBot(username) {
  console.log(`Creating bot: ${username}`)

  const bot = mineflayer.createBot({
    host: host,
    port: port,
    username: username,
    // version: version,        // uncomment if needed
    // auth: 'offline'          // only needed if your server is cracked (most Exaroton AFK farms are)
  })

  // When the bot spawns in the world
  bot.once('spawn', () => {
    console.log(`✅ ${username} joined the server!`)

    // Wait 3 seconds → /register <name>
    setTimeout(() => {
      bot.chat(`/register ${username}`)
      console.log(`📝 ${username} → /register ${username}`)

      // Wait another 3 seconds → /login <name>
      setTimeout(() => {
        bot.chat(`/login ${username}`)
        console.log(`🔑 ${username} → /login ${username}`)

        // Start the AFK chat loop (every 1-2 minutes randomly)
        console.log(`🌾 ${username} is now AFK farming!`)
        
        function sendAfkMessage() {
          bot.chat("bro why is the server lagging?")
          console.log(`💬 ${username} sent: im still here and farming while afk`)

          // Random delay between 60 and 120 seconds
          const randomDelay = 60000 + Math.random() * 60000
          setTimeout(sendAfkMessage, randomDelay)
        }

        sendAfkMessage()

      }, 3000)
    }, 3000)
  })

  // Error handling
  bot.on('kicked', reason => console.log(`❌ ${username} was kicked:`, reason))
  bot.on('error', err => console.log(`❌ ${username} error:`, err.message))
  bot.on('end', () => console.log(`🔌 ${username} disconnected`))

  return bot
}

// Create all 30 bots with a small delay so the server doesn't get overwhelmed at once
async function startAllBots() {
  console.log('🚀 Starting 30 AFK bots...\n')
  
  for (const name of botNames) {
    const bot = createBot(name)
    bots.push(bot)
    await new Promise(resolve => setTimeout(resolve, 1200)) // 1.2 seconds between each bot
  }

  console.log('🎉 All 30 bots have been launched!')
}

// ===================== EXPRESS FOR UPTIMEROBOT =====================
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`
    <h1>✅ 30 Minecraft AFK Bots are RUNNING!</h1>
    <p>Your Exaroton server should now have 30 bots farming for you.</p>
    <p>They will auto-register, login, and say "im still here and farming while afk" every 1-2 minutes.</p>
  `)
})

app.listen(PORT, () => {
  console.log(`🌐 UptimeRobot ping server running on port ${PORT}`)
  console.log(`   → Set UptimeRobot to ping: http://localhost:${PORT} (or your hosting URL)`)
})

// ===================== START EVERYTHING =====================
startAllBots()
