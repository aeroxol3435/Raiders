const mineflayer = require('mineflayer')
const express = require('express')

// ================== CONFIG ==================
const host = 'lapatasmp.aternos.me'   // ← Change to your Exaroton address (e.g. abc123.exaroton.me)
const port = 20962                        // ← Change to your current port from Exaroton panel
// ===========================================

const botNames = [
  "dj_indian",
  "150_rupeya_dega",
  "bap_ko_mat_sikha-chal"
]

const afkMessages = [
  "bro my ping",
  "afk farming chill",
  "lagg?"
]

const bots = []

function createBot(username) {
  console.log(`Creating bot: ${username}`)

  const bot = mineflayer.createBot({
    host: host,
    port: port,
    username: username,
    // auth: 'offline'   // ← Uncomment ONLY if your server is in Cracked/Offline mode
  })

  // Auto reconnect on disconnect
  bot.on('end', () => {
    console.log(`🔌 ${username} disconnected. Reconnecting in 5 seconds...`)
    setTimeout(() => {
      createBot(username)   // Restart the same bot
    }, 5000)
  })

  bot.on('error', (err) => {
    console.log(`❌ ${username} error:`, err.message)
  })

  bot.once('spawn', () => {
    console.log(`✅ ${username} joined the server!`)

    // Wait 3 seconds then login (you said only /login, no register)
    setTimeout(() => {
      bot.chat(`/login ${username}`)
      console.log(`🔑 ${username} → /login ${username}`)

      console.log(`🌾 ${username} is now AFK farming!`)

      // Send random message every 1 minute (60 seconds)
      function sendRandomMessage() {
        const randomMsg = afkMessages[Math.floor(Math.random() * afkMessages.length)]
        bot.chat(randomMsg)
        console.log(`💬 ${username} said: ${randomMsg}`)

        setTimeout(sendRandomMessage, 60000)   // exactly 1 minute
      }

      sendRandomMessage()

    }, 3000)
  })

  // Auto respawn if the bot dies
  bot.on('death', () => {
    console.log(`💀 ${username} died. Respawning...`)
    // Mineflayer automatically tries to respawn, but we force it just in case
    setTimeout(() => {
      if (bot.dead) bot.respawn()
    }, 2000)
  })

  return bot
}

// Start bots one by one with delay so server doesn't crash
async function startAllBots() {
  console.log('🚀 Starting 3 AFK bots one by one...\n')

  for (const name of botNames) {
    createBot(name)
    await new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds gap between bots
  }

  console.log('🎉 All 3 bots launched!')
}

// ===================== EXPRESS FOR UPTIMEROBOT =====================
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`<h1>✅ 3 Minecraft AFK Bots are RUNNING!</h1>`)
})

app.listen(PORT, () => {
  console.log(`🌐 UptimeRobot ping server running on port ${PORT}`)
})

// ===================== START =====================
startAllBots()
