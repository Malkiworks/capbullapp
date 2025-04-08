import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <Image 
              src="/images/logo.png" 
              alt="CapitalBulls Logo" 
              width={150} 
              height={50} 
              style={{ objectFit: 'contain', width: 'auto', height: '60px' }}
            />
          </div>
          <div className="footer-social">
            <a href="https://discord.com/invite/KqyjCFGMwV" className="social-icon"><i className="fab fa-discord"></i></a>
            <a href="https://www.instagram.com/capitalbulls_za" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="https://youtube.com/@capitalbulls_za" className="social-icon"><i className="fab fa-youtube"></i></a>
            <a href="https://api.whatsapp.com/message/CHY4WFEJJQMXC1?autoload=1&app_absent=0" className="social-icon"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
        <div className="footer-middle">
          <div className="footer-nav">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/#hero">Home</Link></li>
              <li><Link href="/#features">Why Us</Link></li>
              <li><Link href="/#community">Community</Link></li>
              <li><Link href="/#gallery">Insights</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div className="footer-nav">
            <h4>Support</h4>
            <ul>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><a href="https://discord.com/invite/KqyjCFGMwV">Discord Help</a></li>
              <li><a href="https://api.whatsapp.com/message/CHY4WFEJJQMXC1?autoload=1&app_absent=0">WhatsApp Support</a></li>
            </ul>
          </div>
          <div className="footer-nav">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/refund">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="disclaimer">
          <h3>Disclaimer</h3>
          <p>Trading CFDs is highly risky and requires skill. Past performance is not indicative of future results. You trade at your own risk. CapitalBulls is not a financial advisor, and all information provided is for educational purposes only. All live streams are for educational purposes only and do not constitute financial advice. Trade responsibly and at your own discretion.</p>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} CapitalBulls. All rights reserved.</p>
          <p className="creator-tag">Made with <span className="heart">♡</span> by <a href="https://busyoaks.co.za" target="_blank" rel="noopener noreferrer">busyOaks</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 