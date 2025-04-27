import { useEffect } from 'react';

const AdSenseAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4816438755807592"
      data-ad-slot="your-ad-slot-id"
      data-ad-format="auto">
    </ins>
  );
};

export default AdSenseAd;
