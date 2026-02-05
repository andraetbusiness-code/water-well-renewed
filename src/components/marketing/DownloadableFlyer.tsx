import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle2, Phone, Globe, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import homeDepotAuthorized from '@/assets/home-depot-authorized.png';

interface DownloadableFlyerProps {
  showDownloadButton?: boolean;
  className?: string;
}

export function DownloadableFlyer({ showDownloadButton = true, className = '' }: DownloadableFlyerProps) {
  const flyerRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Open print dialog for the flyer
    const printContent = flyerRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Select Source Water - Door Hanger Flyer</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', sans-serif;
              background: #f5f5f5;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
            }
            
            .flyer {
              width: 4in;
              height: 9in;
              background: linear-gradient(180deg, #0F766E 0%, #0D9488 50%, #0F766E 100%);
              border-radius: 24px 24px 16px 16px;
              overflow: hidden;
              position: relative;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            }
            
            .door-hole {
              width: 80px;
              height: 80px;
              background: white;
              border-radius: 50%;
              position: absolute;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              box-shadow: inset 0 4px 8px rgba(0,0,0,0.1);
            }
            
            .content {
              padding: 120px 24px 24px;
              text-align: center;
              color: white;
            }
            
            .headline {
              font-size: 24px;
              font-weight: 700;
              line-height: 1.2;
              margin-bottom: 8px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            
            .subheadline {
              font-size: 14px;
              font-weight: 500;
              opacity: 0.9;
              margin-bottom: 32px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            
            .benefits {
              text-align: left;
              margin-bottom: 32px;
            }
            
            .benefit {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              margin-bottom: 16px;
              font-size: 14px;
            }
            
            .benefit-icon {
              width: 20px;
              height: 20px;
              background: #F97316;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              margin-top: 2px;
            }
            
            .benefit-icon svg {
              width: 12px;
              height: 12px;
              color: white;
            }
            
            .cta-section {
              background: white;
              margin: 0 -24px;
              padding: 20px 24px;
              color: #111;
            }
            
            .cta-headline {
              font-size: 16px;
              font-weight: 700;
              color: #0F766E;
              margin-bottom: 8px;
            }
            
            .cta-button {
              background: #F97316;
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 14px;
              display: inline-block;
              margin-bottom: 16px;
            }
            
            .partner-badge {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 12px;
              background: #f8f8f8;
              border-radius: 8px;
              margin-bottom: 16px;
            }
            
            .partner-badge img {
              height: 32px;
            }
            
            .partner-text {
              font-size: 11px;
              font-weight: 600;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .contact-info {
              text-align: center;
            }
            
            .phone {
              font-size: 22px;
              font-weight: 700;
              color: #0F766E;
              margin-bottom: 4px;
            }
            
            .website {
              font-size: 12px;
              color: #666;
            }
            
            .agent-line {
              margin-top: 16px;
              padding-top: 16px;
              border-top: 1px dashed #ddd;
            }
            
            .agent-label {
              font-size: 11px;
              font-weight: 600;
              color: #999;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .agent-blank {
              margin-top: 8px;
              height: 24px;
              border-bottom: 1px solid #333;
            }
            
            @media print {
              body {
                background: white;
                padding: 0;
              }
              .flyer {
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {showDownloadButton && (
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download Flyer (PDF)
        </Button>
      )}
      
      <motion.div
        ref={flyerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flyer w-[4in] bg-gradient-to-b from-primary via-primary/90 to-primary rounded-t-3xl rounded-b-2xl overflow-hidden shadow-2xl relative"
      >
        {/* Door Hole */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-inner" />
        
        {/* Content */}
        <div className="content pt-28 px-6 pb-6 text-center text-primary-foreground">
          <h2 className="headline text-2xl font-bold leading-tight mb-2 drop-shadow-sm">
            CLEANER, HEALTHIER<br />WATER FOR
          </h2>
          <p className="subheadline text-sm font-medium opacity-90 uppercase tracking-wider mb-8">
            Northern California Homes
          </p>
          
          {/* Benefits */}
          <div className="benefits text-left mb-8 space-y-4">
            {[
              'Better tasting water',
              'Removes chlorine and contaminants',
              'Protects your appliances and plumbing',
            ].map((benefit, i) => (
              <div key={i} className="benefit flex items-start gap-3 text-sm">
                <div className="benefit-icon w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-accent-foreground" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="cta-section bg-background mx-0 px-6 py-5 text-foreground">
          <p className="cta-headline text-base font-bold text-primary mb-2">
            Schedule Your FREE Water Test
          </p>
          <div className="cta-button bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm inline-block mb-4">
            FREE WATER TEST
          </div>
          
          {/* Partner Badge */}
          <div className="partner-badge flex items-center justify-center gap-2 p-3 bg-secondary rounded-lg mb-4">
            <img src={homeDepotAuthorized} alt="Home Depot Authorized" className="h-8 object-contain" />
            <span className="partner-text text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Trusted Partner
            </span>
          </div>
          
          {/* Contact Info */}
          <div className="contact-info text-center">
            <div className="phone flex items-center justify-center gap-2 text-xl font-bold text-primary mb-1">
              <Phone className="w-5 h-5" />
              (916) 382-0493
            </div>
            <div className="website flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Globe className="w-3 h-3" />
              selectsourcewater.com
            </div>
          </div>
          
          {/* Agent Name Line */}
          <div className="agent-line mt-4 pt-4 border-t border-dashed border-border">
            <p className="agent-label text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Agent's Name:
            </p>
            <div className="agent-blank mt-2 h-6 border-b border-foreground" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
