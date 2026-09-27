/**
 * Discord OAuth2 Authentication Helper (Implicit Grant Flow)
 * Client-side friendly for Vite SPAs
 */

const DISCORD_CLIENT_ID = import.meta.env?.VITE_DISCORD_CLIENT_ID || '1347000000000000000'
const USER_STORAGE_KEY = 'gamer_user'

/**
 * Returns the Discord OAuth2 authorization URL
 */
export function getDiscordLoginUrl() {
  const origin = window.location.origin
  // Clean redirect URI without trailing slashes or hash
  const redirectUri = encodeURIComponent(`${origin}/`)
  const clientId = encodeURIComponent(DISCORD_CLIENT_ID)
  const scope = encodeURIComponent('identify email')

  return `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`
}

/**
 * Checks window.location.hash for Discord access_token callback
 * Returns a Promise that resolves to the user object, or null if no callback was found
 */
export async function handleDiscordCallback() {
  if (typeof window === 'undefined') return null

  const hash = window.location.hash
  if (!hash || !hash.includes('access_token=')) {
    return null
  }

  try {
    // Parse params from hash fragment
    // Handle cases where hash starts with #access_token=... or something/#access_token=...
    const rawFragment = hash.startsWith('#') ? hash.substring(1) : hash
    const searchString = rawFragment.includes('access_token=') 
      ? rawFragment.substring(rawFragment.indexOf('access_token=')) 
      : rawFragment

    const params = new URLSearchParams(searchString)
    const accessToken = params.get('access_token')
    const tokenType = params.get('token_type') || 'Bearer'

    if (!accessToken) return null

    // Fetch user profile from Discord API
    const response = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    })

    if (!response.ok) {
      console.warn('Discord API token verification failed:', response.status, response.statusText)
      return null
    }

    const discordUser = await response.json()

    // Build standard avatar URL
    const avatarUrl = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`
      : `https://cdn.discordapp.com/embed/avatars/${Math.abs(Number(discordUser.id || 0)) % 5}.png`

    const userObj = {
      id: discordUser.id,
      username: discordUser.username,
      global_name: discordUser.global_name || discordUser.username,
      avatar: discordUser.avatar,
      avatarUrl,
      email: discordUser.email || `${discordUser.username}@users.discord.com`,
      banner: discordUser.banner,
      accessToken,
      loginMethod: 'discord',
      loginTime: Date.now()
    }

    // Persist to localStorage
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userObj))

    // Clear hash tokens from URL and switch route to profile
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `${window.location.pathname}#profile`)
    } else {
      window.location.hash = 'profile'
    }

    return userObj
  } catch (error) {
    console.error('Error handling Discord callback:', error)
    return null
  }
}

/**
 * Retrieves the currently saved user from localStorage
 */
export function getSavedUser() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch (e) {
    console.error('Failed to read saved user:', e)
    return null
  }
}

/**
 * Saves a user object to localStorage
 */
export function saveUser(user) {
  if (typeof window === 'undefined' || !user) return
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } catch (e) {
    console.error('Failed to save user:', e)
  }
}

/**
 * Logs out the current user by removing them from storage
 */
export function logoutUser() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(USER_STORAGE_KEY)
  } catch (e) {
    console.error('Failed to remove user:', e)
  }
}

/**
 * Instant Mock Discord login for testing without registering a live client ID
 */
export function loginMockDiscord(customData = {}) {
  const mockUser = {
    id: '894102948291048123',
    username: 'nepalgamer',
    global_name: 'Sagarmatha Gamer',
    avatar: 'mock_discord_avatar',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=256&q=80',
    email: 'nepalgamer@gmail.com',
    accessToken: 'mock_discord_access_token_demo',
    loginMethod: 'discord_demo',
    loginTime: Date.now(),
    ...customData
  }

  saveUser(mockUser)
  return mockUser
}
