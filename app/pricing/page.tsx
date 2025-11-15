export default function PricingPage(){
  return (
    <div className="grid">
      <div className="card" style={{maxWidth:720, margin:'0 auto'}}>
        <h1 className="title">Premium access</h1>
        <p className="subtitle">Upgrade anytime. Your premium lasts 1 month from the moment of unlocking.</p>
        <ul style={{color:'#cbd5e1',margin:'12px 0 24px'}}>
          <li>• Full access to the embedded extractor</li>
          <li>• Priority support</li>
          <li>• No ads</li>
        </ul>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <a className="btn btn-primary" href="https://flutterwave.com/pay/7k8wh62jmtzh" target="_blank" rel="noopener noreferrer">Pay with Flutterwave</a>
          <a className="btn" href="/payment/success">I’ve paid – unlock now</a>
        </div>
      </div>
    </div>
  )
}
