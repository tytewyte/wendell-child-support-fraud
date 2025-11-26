# Wendell's Legal Resource Matrix

A Matrix-themed website providing legal document templates and resources for child support and court fraud cases. Built with HTML, CSS, and JavaScript, featuring PayPal subscription integration.

## 🚀 Features

- **Matrix Theme**: Orange/red color scheme with falling characters animation
- **Legal Document Templates**: Child support motions and fraud on the court complaints
- **Membership System**: PayPal-powered subscription at $3.99/month
- **Responsive Design**: Works on desktop and mobile devices
- **Terminal UI**: Cyberpunk-inspired interface

## 📁 Project Structure

```text
wendell-child-support-fraud/
├── index.html          # Main HTML file
├── style.css           # Matrix-themed styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── docs/               # Document templates (for members)
    ├── child-support/
    └── fraud-on-court/
```

## 🛠️ Setup Instructions

### 1. PayPal Configuration

1. Create a PayPal Business account at `[https://www.paypal.com/business](https://www.paypal.com/business)`
2. Go to PayPal Developer Dashboard: `[https://developer.paypal.com/dashboard/](https://developer.paypal.com/dashboard/)`
3. Create a new REST API app
4. Get your Client ID
5. Replace `YOUR_PAYPAL_CLIENT_ID` in `index.html` with your actual Client ID
6. Create a subscription plan and replace `YOUR_PLAN_ID` in `script.js`

### 2. GitHub Pages Deployment

1. Push this code to your GitHub repository
2. Go to repository Settings > Pages
3. Select "Deploy from a branch"
4. Choose main branch and / (root) folder
5. Your site will be available at `[https://yourusername.github.io/wendell-child-support-fraud](https://yourusername.github.io/wendell-child-support-fraud)`

### 3. Custom Domain

If you have a custom domain:

1. Go to your domain registrar's DNS settings
2. Add a CNAME record pointing to `yourusername.github.io`
3. Update GitHub Pages settings to use your custom domain

## 💰 PayPal Integration

The site includes PayPal subscription functionality:

- **Free Access**: Basic content and testimony
- **Premium Membership** ($3.99/month): All document templates and downloads

### PayPal Setup Steps

1. **Create PayPal Business Account**
   - Sign up at `[https://www.paypal.com/business](https://www.paypal.com/business)`
   - Verify your account

2. **Get API Credentials**
   - Go to `[https://developer.paypal.com/dashboard/](https://developer.paypal.com/dashboard/)`
   - Create new REST API app
   - Copy Client ID

3. **Create Subscription Plan**
   - In PayPal Dashboard, create a subscription plan
   - Set price to $3.99/month
   - Copy the Plan ID

4. **Update Code**

   ```javascript
   // In index.html, replace:
   src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&vault=true&intent=subscription"

   // In script.js, replace:
   'plan_id': 'YOUR_PLAN_ID'
   ```

## 🎨 Customization

### Colors (CSS Variables)

   ```css
   :root {
       --primary-orange: #FF4500;
       --secondary-orange: #FF6347;
       --dark-red: #8B0000;
       --bg-dark: #0A0A0A;
   }
   ```

### Adding New Documents

1. Create document files in the `docs/` directory
2. Update the document list in `index.html`
3. Add download functionality in `script.js`

### Matrix Effect Customization

   ```javascript
   // In script.js, modify the characters:
   this.characters = 'YOUR_CUSTOM_CHARACTERS';
   ```

## 🔧 Technical Details

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Payments**: PayPal JavaScript SDK
- **Hosting**: GitHub Pages (free)
- **Authentication**: LocalStorage (simple membership tracking)

## 📱 Mobile Responsiveness

The site is fully responsive and works on:

- Desktop browsers
- Tablets
- Mobile phones

## ⚠️ Legal Disclaimer

**IMPORTANT**: This website includes a prominent legal disclaimer stating that:

- This is not legal advice
- The content represents personal opinions and research
- Users should consult licensed attorneys
- Documents are templates and should be customized

## 🚀 Future Enhancements

- [ ] Member dashboard
- [ ] Document customization tools
- [ ] Community forum
- [ ] Video tutorials
- [ ] Live chat support
- [ ] Email notifications

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For support or questions:

1. Use the contact form on the website
2. Check the GitHub Issues page
3. Email: [your-email@example.com](mailto:your-email@example.com)

---

**Built with ❤️ for those fighting child support injustice**
