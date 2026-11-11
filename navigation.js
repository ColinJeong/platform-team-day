(function(root){
  'use strict';
  // This is a browser JavaScript key supplied for the Kakao SDK, not a REST or admin key.
  const KAKAO_JAVASCRIPT_KEY='f0c6ee831104d4f7be33e73418785693';
  const SITE_URL='https://colinjeong.github.io/platform-team-day';
  const encode=encodeURIComponent;
  function device(ua,platform,touches){const ios=/iPhone|iPad|iPod/i.test(ua)||(platform==='MacIntel'&&touches>1);const android=/Android/i.test(ua);return {ios,android,mobile:ios||android};}
  function webMap(p){return p.naver.includes('/entry/place/')?'https://m.place.naver.com/place/'+p.naver.split('/').pop()+'/home':'https://map.naver.com/p/search/'+encode(p.name);}
  function links(p,ua='',platform='',touches=0){
    const d=device(ua,platform,touches),name=encode(p.name),origin=encode(SITE_URL+'/');
    const naverPath=`route/car?dlat=${p.lat}&dlng=${p.lng}&dname=${name}&appname=${origin}`;
    // iOS TMAP and Android TMAP use different destination field names.
    const tmapPath=d.ios?`route?rGoName=${name}&rGoX=${p.lng}&rGoY=${p.lat}`:`route?goalname=${name}&goalx=${p.lng}&goaly=${p.lat}`;
    if(!d.mobile)return {mobile:false,naver:webMap(p),tmap:webMap(p)};
    if(d.android)return {mobile:true,naver:`intent://${naverPath}#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;S.browser_fallback_url=${encode(webMap(p))};end`,tmap:`intent://${tmapPath}#Intent;scheme=tmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.skt.tmap.ku;S.browser_fallback_url=${encode('https://play.google.com/store/apps/details?id=com.skt.tmap.ku')};end`};
    return {mobile:true,naver:'nmap://'+naverPath,tmap:'tmap://'+tmapPath};
  }
  function initializeKakao(){try{if(!root.Kakao)return false;if(!root.Kakao.isInitialized())root.Kakao.init(KAKAO_JAVASCRIPT_KEY);return root.Kakao.isInitialized()}catch{return false}}
  function startKakao(p){if(!initializeKakao())throw new Error('Kakao SDK unavailable');root.Kakao.Navi.start({name:p.name,x:p.lng,y:p.lat,coordType:'wgs84'});}
  root.TeamNavigation={SITE_URL,device,links,webMap,initializeKakao,startKakao};
})(typeof window!=='undefined'?window:globalThis);
