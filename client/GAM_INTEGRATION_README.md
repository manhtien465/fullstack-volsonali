# Google Ad Manager (GAM) Integration Guide

This guide explains how to implement and use Google Ad Manager (GAM) alongside Google AdSense in your gaming website.

## 🚀 Quick Start


### 1. Environment Setup

Add these environment variables to your `.env.local` file:

\`\`\`env
# Google Ad Manager Configuration
NEXT_PUBLIC_GAM_NETWORK_CODE=123456789
NEXT_PUBLIC_GAM_ENABLED=true

# Google AdSense (existing)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ENABLED=true
\`\`\`

### 2. Basic Implementation

\`\`\`tsx
import GAMBannerAd from "@/components/ads/GAMBannerAd"
import GAMRectangleAd from "@/components/ads/GAMRectangleAd"

export default function GamePage() {
  return (
    <div>
      {/* Header Banner */}
      <GAMBannerAd adUnitId="header-leaderboard" size="leaderboard" />
      
      {/* Sidebar Rectangle */}
      <GAMRectangleAd adUnitId="sidebar-rectangle" size="medium" />
    </div>
  )
}
\`\`\`

## 📋 Available Ad Formats

### In-Page Ads

#### 1. Banner Ads
\`\`\`tsx
<GAMBannerAd 
  adUnitId="header-leaderboard" 
  size="leaderboard" // "leaderboard" | "banner" | "mobile"
  centered={true}
  className="mb-4"
/>
\`\`\`

**Sizes:**
- `leaderboard`: 728x90, 970x90
- `banner`: 320x50
- `mobile`: 320x50, 320x100

#### 2. Rectangle Ads
\`\`\`tsx
<GAMRectangleAd 
  adUnitId="sidebar-rectangle" 
  size="medium" // "medium" | "large"
  context={{ page: "games", category: "puzzle" }}
/>
\`\`\`

**Sizes:**
- `medium`: 300x250
- `large`: 336x280

### Out-of-Page Ads

#### 3. Interstitial Ads
\`\`\`tsx
<GAMInterstitialAd 
  adUnitId="interstitial"
  trigger="scroll" // "manual" | "scroll" | "time"
  scrollPercentage={75}
  onClose={() => console.log("Interstitial closed")}
/>
\`\`\`

#### 4. Anchor/Sticky Ads
\`\`\`tsx
<GAMAnchorAd 
  adUnitId="anchor-bottom"
  position="bottom" // "top" | "bottom"
  closeable={true}
/>
\`\`\`

#### 5. Rewarded Video Ads
\`\`\`tsx
<GAMRewardedAd 
  adUnitId="rewarded-video"
  reward={{ type: "coins", amount: 100 }}
  onReward={(reward) => {
    console.log("User earned:", reward)
    // Add coins to user account
  }}
/>
\`\`\`

## 🎮 Gaming-Specific Examples

### Game Detail Page
\`\`\`tsx
export default function GameDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Ad - Desktop Only */}
      <div className="hidden md:block mb-6">
        <GAMBannerAd adUnitId="header-leaderboard" size="leaderboard" />
      </div>

      {/* Mobile Banner */}
      <div className="md:hidden mb-4">
        <GAMBannerAd adUnitId="mobile-banner" size="mobile" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <GameContent />
          
          {/* In-Content Ad */}
          <div className="my-8">
            <GAMRectangleAd 
              adUnitId="content-rectangle" 
              context={{ 
                page: "game-detail",
                gameCategory: game.category,
                gameRating: game.rating 
              }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <GAMRectangleAd adUnitId="sidebar-rectangle" />
        </div>
      </div>

      {/* Interstitial - Triggered after 75% scroll */}
      <GAMInterstitialAd 
        adUnitId="interstitial"
        trigger="scroll"
        scrollPercentage={75}
      />
    </div>
  )
}
\`\`\`

### Games Listing Page
\`\`\`tsx
export default function GamesPage() {
  return (
    <div>
      {/* Header Banner */}
      <GAMBannerAd adUnitId="header-leaderboard" />
      
      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <GameGrid games={games} />
        </div>
        
        {/* Sticky Sidebar Ad */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <GAMRectangleAd adUnitId="sidebar-rectangle" />
          </div>
        </div>
      </div>

      {/* Mobile Anchor Ad */}
      <GAMAnchorAd adUnitId="anchor-bottom" position="bottom" />
    </div>
  )
}
\`\`\`

## ⚙️ Advanced Configuration

### Custom Ad Units
\`\`\`tsx
import { gamManager } from "@/services/gamManager"

// Register custom ad unit
gamManager.registerAdUnit({
  id: "custom-skyscraper",
  name: "Custom Skyscraper",
  adUnitPath: "/123456789/gaming-fun/custom-skyscraper",
  sizes: [{ width: 160, height: 600 }],
  type: "skyscraper",
  position: "sidebar",
  targeting: { 
    position: "sidebar", 
    format: "skyscraper",
    customKey: "customValue"
  },
  refreshable: true,
  enabled: true,
})
\`\`\`

### Display Conditions
\`\`\`tsx
// Only show on mobile devices
displayConditions: [
  { type: "device", value: "mobile", operator: "equals" }
]

// Show after 50% scroll
displayConditions: [
  { type: "scroll", value: 50, operator: "greater" }
]

// Show only on game pages
displayConditions: [
  { type: "page", value: "/games", operator: "contains" }
]
\`\`\`

### Targeting
\`\`\`tsx
// Set global targeting
gamManager.setGlobalTargeting({
  site: "gamingfun",
  section: "games",
  userType: "premium",
  gameCategory: "puzzle"
})

// Ad-specific targeting
<GAMRectangleAd 
  adUnitId="sidebar-rectangle"
  context={{
    page: "game-detail",
    gameId: "tetris",
    userLevel: "advanced"
  }}
/>
\`\`\`

### Lazy Loading
\`\`\`tsx
<GAMRectangleAd 
  adUnitId="content-rectangle"
  lazyLoad={true} // Loads when element enters viewport
/>
\`\`\`

## 🔧 Manual Ad Management

### Refresh Ads
\`\`\`tsx
import { gamManager } from "@/services/gamManager"

// Refresh specific ad
gamManager.refreshAd("gam-sidebar-rectangle-abc123")

// Refresh all ads
gamManager.refreshAllAds()
\`\`\`

### Destroy Ads
\`\`\`tsx
// Clean up ad when component unmounts
useEffect(() => {
  return () => {
    gamManager.destroyAd(divId)
  }
}, [])
\`\`\`

## 📊 Analytics Integration

GAM events are automatically tracked with Google Analytics:

\`\`\`tsx
// Events tracked:
// - gam_slot_defined
// - gam_slot_refreshed
// - gam_impression_viewable
// - gam_ad_clicked
\`\`\`

## 🐛 Troubleshooting

### Common Issues

1. **Ads not showing**
   - Check network code in environment variables
   - Verify ad unit paths match GAM setup
   - Check browser console for errors

2. **"googletag is not defined" error**
   - Ensure GAMScript is loaded in layout.tsx
   - Check network connectivity
   - Verify script loading order

3. **Mobile ads not displaying**
   - Check display conditions
   - Verify mobile ad unit configuration
   - Test on actual mobile devices

### Debug Mode
\`\`\`tsx
// Enable debug logging
console.log("GAM Debug:", {
  networkCode: process.env.NEXT_PUBLIC_GAM_NETWORK_CODE,
  enabled: process.env.NEXT_PUBLIC_GAM_ENABLED,
  adUnits: gamManager.getAdUnit("header-leaderboard")
})
\`\`\`

## 🎯 Best Practices

### Performance
- Use lazy loading for below-fold ads
- Implement proper cleanup in useEffect
- Avoid excessive ad refreshing

### User Experience
- Make interstitials closeable
- Use appropriate ad sizes for content
- Respect user preferences (ad blockers)

### Mobile Optimization
- Use mobile-specific ad units
- Implement touch-friendly close buttons
- Consider anchor ads for mobile

### Privacy & Compliance
- Implement GDPR consent management
- Respect Do Not Track preferences
- Follow platform advertising policies

## 📱 Mobile Considerations

\`\`\`tsx
// Mobile-specific implementation
const isMobile = useMediaQuery("(max-width: 768px)")

return (
  <div>
    {isMobile ? (
      <GAMBannerAd adUnitId="mobile-banner" size="mobile" />
    ) : (
      <GAMBannerAd adUnitId="header-leaderboard" size="leaderboard" />
    )}
  </div>
)
\`\`\`

## 🔐 Security Notes

- Always use HTTPS for ad serving
- Implement proper CSP headers
- Validate ad content before display
- Monitor for malicious ads

## 📈 Performance Monitoring

\`\`\`tsx
// Track ad performance
<GAMAdUnit
  adUnitId="sidebar-rectangle"
  onAdLoad={(slot) => {
    console.log("Ad loaded:", slot.id)
    // Track loading time
  }}
  onAdError={(error) => {
    console.error("Ad error:", error)
    // Report to analytics
  }}
/>
\`\`\`

This integration provides a complete GAM solution that works alongside your existing AdSense setup, offering maximum revenue potential and flexible ad management.
