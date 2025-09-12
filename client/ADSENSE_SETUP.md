# Google AdSense Integration Setup

## 1. Get Your AdSense Account Ready

1. **Apply for Google AdSense**: Visit [www.google.com/adsense](https://www.google.com/adsense)
2. **Add your website**: Add `gamingfun.net` to your AdSense account
3. **Get your Publisher ID**: Find your client ID (format: `ca-pub-XXXXXXXXXX`)
 
## 2. Configure Environment Variables

Add to your `.env.local` file:
\`\`\`env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
\`\`\`


## 3. Create Ad Units in AdSense

In your AdSense dashboard, create these ad units:

### Header Banner (728x90 Leaderboard)
- **Name**: Header Banner
- **Size**: 728x90 (Leaderboard)
- **Type**: Display ads
- **Copy the Ad Slot ID**

### Sidebar Ad (300x250 Rectangle)
- **Name**: Sidebar Rectangle
- **Size**: 300x250 (Medium Rectangle)
- **Type**: Display ads
- **Copy the Ad Slot ID**

### Responsive Content Ad
- **Name**: Content Ad
- **Size**: Responsive
- **Type**: Display ads
- **Copy the Ad Slot ID**

### Mobile Sticky Ad
- **Name**: Mobile Sticky
- **Size**: 320x50 (Mobile Banner)
- **Type**: Display ads
- **Copy the Ad Slot ID**

## 4. Update Ad Slot IDs

Replace the placeholder slot IDs in your components:

\`\`\`tsx
// In app/page.tsx
<BannerAd adSlot="1234567890" /> // Replace with your actual slot ID

// In app/games/page.tsx
<ResponsiveAd adSlot="1234567891" /> // Replace with your actual slot ID

// In app/games/snake/page.tsx
<SidebarAd adSlot="1234567892" /> // Replace with your actual slot ID
\`\`\`

## 5. AdSense Policy Compliance

### Content Requirements:
- ✅ Original, high-quality content
- ✅ Clear navigation and site structure
- ✅ Privacy policy and terms of service
- ✅ Contact information

### Technical Requirements:
- ✅ Fast loading times
- ✅ Mobile-friendly design
- ✅ HTTPS enabled
- ✅ Valid HTML

### Gaming Site Specific:
- ✅ Age-appropriate content
- ✅ No violent or inappropriate games
- ✅ Clear game descriptions
- ✅ User-friendly interface

## 6. Ad Placement Best Practices

### High-Performing Positions:
1. **Above the fold** - Header banner
2. **Within content** - Between articles/games
3. **Sidebar** - Right side on desktop
4. **End of content** - After game completion

### Mobile Optimization:
- Use responsive ad units
- Avoid intrusive interstitials
- Ensure ads don't block content
- Test on various screen sizes

## 7. Testing Your Ads

1. **Use AdSense Test Mode**: Enable test ads during development
2. **Check Ad Loading**: Verify ads load properly
3. **Mobile Testing**: Test on various devices
4. **Performance Monitoring**: Use Google Analytics integration

## 8. Revenue Optimization

### A/B Testing:
- Test different ad sizes
- Try various placements
- Monitor click-through rates
- Analyze user engagement

### Ad Formats to Try:
- **Display ads**: Standard banner ads
- **Native ads**: Blend with content
- **Auto ads**: Let Google optimize placement
- **Matched content**: Related content recommendations

## 9. Monitoring and Analytics

Track these metrics:
- **Page RPM**: Revenue per thousand impressions
- **CTR**: Click-through rate
- **Viewability**: How often ads are seen
- **User Experience**: Bounce rate and session duration

## 10. Common Issues and Solutions

### Ads Not Showing:
- Check client ID is correct
- Verify ad slot IDs
- Ensure site is approved
- Check for ad blockers

### Low Revenue:
- Improve content quality
- Optimize ad placement
- Increase traffic
- Test different ad formats

### Policy Violations:
- Review AdSense policies
- Remove problematic content
- Improve user experience
- Appeal if necessary
