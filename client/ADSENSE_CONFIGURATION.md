# AdSense Configuration Guide

## Quick Setup Checklist

### ✅ **Step 1: Environment Variables**
Add to your `.env.local` file:
\`\`\`env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
\`\`\`

### ✅ **Step 2: Replace Ad Slot IDs**
Update these placeholder values in your components:

\`\`\`tsx
// ❌ Before (Placeholder)
<AdWithFallback adSlot="YOUR_HEADER_BANNER_SLOT_ID" />

// ✅ After (Real Slot ID)
<AdWithFallback adSlot="1234567890" />
\`\`\`


### ✅ **Step 3: Verify Configuration**
The system will automatically:
- ✅ Check if `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set
- ✅ Validate the client ID format (`ca-pub-` prefix)
- ✅ Verify ad slot IDs are not placeholders
- ✅ Show alternative content if not configured

## Configuration Validation

### **Automatic Checks:**
\`\`\`typescript
// The system validates:
1. Client ID exists and is not placeholder
2. Client ID starts with "ca-pub-"
3. Ad slots are not placeholder values
4. AdSense script loads properly
\`\`\`

### **Development Helper:**
In development mode, you'll see a configuration checker that shows:
- ✅ Client ID status
- ✅ Ad slot validation
- ✅ Script loading status
- ⚠️ Setup instructions if needed

## Fallback Behavior

### **When AdSense is NOT Configured:**
\`\`\`tsx
// Shows alternative content instead of ads
<AlternativeContent type="games" />      // Game recommendations
<AlternativeContent type="newsletter" /> // Email signup
<AlternativeContent type="social" />     // Social media
<AlternativeContent type="features" />   // Site features
\`\`\`

### **When Ad Blocker is Detected:**
\`\`\`tsx
// Shows polite message + alternative content
<AdBlockerMessage variant="polite" />
<AlternativeContent type="games" />
\`\`\`

## File Locations to Update

### **1. Environment File:**
\`\`\`bash
# .env.local
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-YOUR-ACTUAL-ID
\`\`\`

### **2. Page Components:**
\`\`\`tsx
// app/page.tsx
<AdWithFallback adSlot="YOUR-ACTUAL-SLOT-ID" />

// app/games/page.tsx  
<AdWithFallback adSlot="YOUR-ACTUAL-SLOT-ID" />

// app/games/snake/page.tsx
<AdWithFallback adSlot="YOUR-ACTUAL-SLOT-ID" />
\`\`\`

### **3. Layout Component:**
\`\`\`tsx
// app/layout.tsx
<StickyAd adSlot="YOUR-ACTUAL-SLOT-ID" />
\`\`\`

## Testing Your Setup

### **1. Check Console Logs:**
\`\`\`javascript
// Look for these messages:
"✅ AdSense properly configured"
"AdSense script loaded successfully"

// Or warnings:
"⚠️ AdSense configuration issues"
"AdSense client ID not properly configured"
\`\`\`

### **2. Visual Indicators:**
- **Configured**: Real ads display
- **Not Configured**: Alternative content shows
- **Ad Blocked**: Polite message + alternative content

### **3. Development Checker:**
Enable the configuration checker:
\`\`\`javascript
// In browser console:
localStorage.setItem('showAdDebug', 'true')
// Refresh page to see checker
\`\`\`

## Common Issues & Solutions

### **Issue: Ads Not Showing**
\`\`\`typescript
// Check these:
1. NEXT_PUBLIC_ADSENSE_CLIENT_ID is set correctly
2. Ad slot IDs are real (not placeholders)
3. AdSense account is approved
4. Site is added to AdSense account
\`\`\`

### **Issue: Alternative Content Always Shows**
\`\`\`typescript
// Likely causes:
1. Client ID is still "ca-pub-XXXXXXXXXX"
2. Ad slots contain "YOUR_" or "SLOT_ID"
3. AdSense script failed to load
\`\`\`

### **Issue: Console Errors**
\`\`\`typescript
// Common fixes:
1. Verify client ID format: "ca-pub-1234567890123456"
2. Check ad slot IDs are numeric
3. Ensure site is approved in AdSense
\`\`\`

## Production Deployment

### **Before Going Live:**
1. ✅ Replace ALL placeholder values
2. ✅ Test in development mode
3. ✅ Verify AdSense account approval
4. ✅ Add domain to AdSense account
5. ✅ Test on staging environment

### **After Deployment:**
1. ✅ Monitor console for errors
2. ✅ Check ads display properly
3. ✅ Verify alternative content works
4. ✅ Test ad blocker detection

## Benefits of This Approach

### **Development Friendly:**
- ✅ Works without AdSense configuration
- ✅ Shows helpful error messages
- ✅ Provides visual configuration checker
- ✅ No broken layouts during development

### **Production Ready:**
- ✅ Automatic fallbacks for missing config
- ✅ Graceful handling of ad blockers
- ✅ Alternative content maintains engagement
- ✅ No empty spaces or broken layouts

### **User Experience:**
- ✅ Always shows valuable content
- ✅ Respects user choices (ad blockers)
- ✅ Maintains site functionality
- ✅ Provides clear messaging
