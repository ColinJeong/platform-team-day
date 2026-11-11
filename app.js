'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const players=[{id:0,name:'연택이'},{id:1,name:'성훈이'},{id:2,name:'용현이'},{id:3,name:'은수'},{id:4,name:'규춘이'},{id:5,name:'희원이'},{id:6,name:'준성이'},{id:11,name:'동규'},{id:10,name:'유진이'},{id:7,name:'주현이'},{id:9,name:'근영이',guide:true},{id:8,name:'지훈이',guide:true}];
const dialogueData={
intro:[{who:9,text:'안녕하세요, 근영이에요. 이번 수요일은 밖에서 만나요! 책 읽고 점심 먹은 다음, 볼링장으로 갈 거예요.'},{who:8,text:'지훈이에요. 좋은 자리에 앉으려면 10시 전에 도착해야 해요. 주차랑 길찾기는 각 장소 아래에 넣어뒀어요.'}],
book:[{who:8,text:'책방 안에 먹거리도 있어요. 취향껏 골라 먹으면서 책 읽으면 돼요. 배고픈데 점심까지 꾹 참을 필요는 없어요!'},{who:9,text:'다만 1시에는 파스타가 기다리고 있습니다. 점심 먹을 배는 조금 남겨두는 걸로요.'},{who:8,text:'꼭 한 권을 다 읽을 필요는 없어요. 평소 안 보던 만화나 아트북도 한번 펼쳐보세요. 재미있으면 저한테도 추천해 주세요!'}],
lunch:[{who:9,text:'점심은 스콜라파스타예요. 메뉴가 꽤 많아서 미리 봐두면 좋겠어요. 먹고 싶은 거 하나씩 골라 와요!'},{who:8,text:'하트를 누르면 내 메뉴 후보로 표시돼요. 주문이 들어가는 건 아니니 편하게 골라봐요. 새로고침하면 지워지는 건 참고해 주세요.'}],
bowling:[{who:8,text:'은수팀, 주현팀, 유진팀으로 나눠서 칩니다. 팀장 포함 네 명씩이에요. 볼링이 오랜만이어도 괜찮아요. 응원은 크게 부탁해요!'},{who:9,text:'우승팀 네 명한테는 어마어마한 선물이 있다고 합니다. 제가 이렇게 말해버렸으니 이제 준비하는 사람만 큰일 났네요.'},{who:8,text:'우리 팀이 우승을 못 해도 개인상은 노려볼 수 있어요. 나머지 두 팀에서 점수가 가장 높은 한 분에게 「개천에서 난 용」 상을 드려요.'}],
awards:[{who:9,text:'선물 받을 사람이 누가 될지 궁금하네요. 아래 상자를 누르면 시상 내용을 볼 수 있어요.'},{who:8,text:'우승팀 네 명에 개인상 한 명, 모두 다섯 명이에요. 상품은 당일 공개할게요. 일단 기대는 해주세요!'}]
};
const places={
 book:{name:'그래픽바이대신',address:'서울 송파구 위례순환로 387 대신위례센터 1관 B1',parking:'건물 지하주차장 / 3시간 무료',transit:'8호선 장지, 복정역 경유 후 추가 이동',naver:'https://map.naver.com/p/entry/place/1706923553',lat:37.477855,lng:127.143898},
 lunch:{name:'스콜라파스타',address:'서울 송파구 위례광장로 230 상가 2동 1층 B-104호',parking:'위례2차아이파크 상가주차장 / 2시간 무료',transit:'5호선 거여, 8호선 장지역 경유 후 추가 이동',naver:'https://map.naver.com/p/entry/place/1146233556',lat:37.47872862612156,lng:127.14324707427271},
 bowl:{name:'볼소크라테스',address:'경기 하남시 감일중앙로 80 아클라우드 B1',parking:'아클라우드 상가주차장 / 무료',transit:'5호선 마천역 경유 후 추가 이동',naver:'https://map.naver.com/p/entry/place/1250082843',lat:37.5108,lng:127.155993}
};
// Browser-safe JavaScript key only. REST API credentials are not included.
const menus={
 pasta:[['알리오 올리오','Aglio e Olio / 마늘, 앤초비, 올리브오일'],['봉골레','Vongole / 바지락, 올리브오일'],['라구 비앙코','Ragu Bianco con il Cognac / 화이트라구'],['가을 파스타 주카','Stagione Pasta “Zucca” / 땅콩호박, 크림'],['마레','Mare / 해산물, 토마토소스'],['만조','Manzo / 소고기, 버섯, 크림'],['푸타네스카','Puttanesca / 케이퍼, 토마토소스'],['감베로니','Gamberoni / 새우, 날치알, 크림'],['스콜라 리소토','Scola Risotto / 오곡, 새우, 크림']],
 pizza:[['마르게리타','Margherita / 토마토, 모짜렐라, 바질'],['풍기','Funghi / 다양한 버섯, 트러플크림'],['콰트로 포르마지','Quattro Formaggi / 네 가지 치즈, 피칸'],['페퍼로니','Pepperoni / 살라미, 치미추리, 모짜렐라'],['루꼴라 추가 (50g)','+Rucolla'],['한치 튀김','Calamari Fritti'],['훈연 연어','Salmone / 루꼴라, 오렌지, 케이퍼'],['먹물 아란치니 (2개)','Arancini (2p)'],['시즌 샐러드','Insalata di Stagione / 제철 과일, 리코타'],['시저 샐러드','Insalata Cesare / 베이컨, 로메인'],['루꼴라 샐러드','Insalata Rucola / 화이트발사믹 드레싱']],
 main:[['채끝등심 스테이크 (300g)','Bisteca di Manzo / 감자매쉬'],['브라자토 (220g)','Brasato / 레드와인에 조리한 소고기'],['폴로','Pollo / 치킨, 허브빵가루, 구운 야채'],['티라미수','Tiramisu']]
};
let toastTimer;function toast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2700)}
let reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;const motionButton=$('#motion-toggle');function motionState(){document.documentElement.classList.toggle('no-motion',reduceMotion);motionButton.textContent=reduceMotion?'▶':'Ⅱ';motionButton.setAttribute('aria-pressed',String(reduceMotion));motionButton.setAttribute('aria-label',reduceMotion?'움직임 켜기':'움직임 끄기')}motionState();motionButton.addEventListener('click',()=>{reduceMotion=!reduceMotion;motionState();toast(reduceMotion?'캐릭터 움직임을 멈췄어요.':'캐릭터가 다시 움직여요!')});
const dialogueControllers=[];
$$('[data-dialogue]').forEach(el=>{
 const lines=dialogueData[el.dataset.dialogue];let index=0,timer=null,typing=false,started=false;
 el.innerHTML='<div class="dialogue-portrait"><img alt="" class="idle" loading="lazy"></div><div class="speech"><span class="speaker"></span><p class="speech-text"></p><div class="speech-bottom"><span class="speech-count"></span><button class="speech-next" aria-label="다음 대사">다음 대사 ▸</button></div></div>';
 const img=$('img',el),speaker=$('.speaker',el),text=$('.speech-text',el),count=$('.speech-count',el),next=$('.speech-next',el);
 function show(animate){clearInterval(timer);const line=lines[index];img.src='assets/player-'+line.who+'.png';img.alt=line.who===9?'근영이':'지훈이';speaker.textContent=img.alt+' / 안내자';count.textContent=(index+1)+' / '+lines.length;next.textContent=index===lines.length-1?'처음 대사 ↺':'다음 대사 ▸';if(!animate||reduceMotion){text.textContent=line.text;typing=false;return}let n=0;typing=true;text.textContent='';timer=setInterval(()=>{n+=2;text.textContent=line.text.slice(0,n);if(n>=line.text.length){clearInterval(timer);typing=false}},28)}
 show(false);
 next.addEventListener('click',()=>{if(typing){show(false)}else{index=(index+1)%lines.length;show(true)}});
 const io=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!started){started=true;show(true);io.disconnect()}},{threshold:.5});io.observe(el);dialogueControllers.push(()=>show(false));
});
motionButton.addEventListener('click',()=>{if(reduceMotion)dialogueControllers.forEach(fn=>fn())});
$$('.quest-check').forEach(b=>b.addEventListener('click',()=>{b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'));if($$('.quest-check[aria-pressed=true]').length===3)toast('세 개 다 해봤네요! 재미있는 책 찾으셨나요?')}));
$$('[data-hello]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.hello==='근영이'?'근영이: 수요일에 봐요! 늦지 않게 오세요.':'지훈이: 책방 먹거리도 꼭 둘러보세요!')));
const selected=new Set();let currentMenu='pasta';
function renderMenu(){const list=$('#menu-list');list.setAttribute('aria-labelledby','tab-'+currentMenu);list.innerHTML=menus[currentMenu].map(([name,desc],i)=>`<div class="menu-item"><div><h4>${name}</h4><p>${desc}</p></div><button class="menu-heart" data-item="${currentMenu}-${i}" aria-label="${name} 메뉴 후보 선택" aria-pressed="${selected.has(currentMenu+'-'+i)}">${selected.has(currentMenu+'-'+i)?'♥':'♡'}</button></div>`).join('')}
function switchMenu(b){currentMenu=b.dataset.menu;$$('[data-menu]').forEach(tab=>{const active=tab===b;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});renderMenu()}
$$('[data-menu]').forEach((b,i)=>{b.addEventListener('click',()=>switchMenu(b));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=$$('[data-menu]');const n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;switchMenu(tabs[n]);tabs[n].focus()}})});renderMenu();
$('#menu-list').addEventListener('click',e=>{const b=e.target.closest('[data-item]');if(!b)return;const id=b.dataset.item;selected.has(id)?selected.delete(id):selected.add(id);b.setAttribute('aria-pressed',String(selected.has(id)));b.textContent=selected.has(id)?'♥':'♡';const names=[...selected].map(x=>{const[k,i]=x.split('-');return menus[k][i][0]});$('#menu-selection').textContent=names.length?'내 메뉴 후보: '+names.join(' / '):'내 메뉴 후보를 골라 두세요. 주문은 현장에서!'});
$$('[data-team]').forEach(b=>b.addEventListener('click',()=>{b.classList.remove('cheer');void b.offsetWidth;b.classList.add('cheer');$('#team-hint').textContent=b.dataset.team+' 응원 접수! 스트라이크 부탁해요.';setTimeout(()=>b.classList.remove('cheer'),1100)}));
$('#treasure').addEventListener('click',()=>{const b=$('#treasure'),open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!open));$('#reward-list').hidden=open;$('strong',b).textContent=open?'보물상자를 열어 보세요':'시상 정보가 열렸어요!';if(!open)toast('우승팀 4명 + 개인상 1명, 총 5명!')});
$('#roster').innerHTML=players.map(p=>`<button class="roster-button" data-player="${p.id}" aria-label="${p.name}에게 인사하기"><small>${p.guide?'오늘의 안내자':''}</small><img src="assets/player-${p.id}.png" alt="${p.name} 도트 캐릭터" loading="lazy"><span>${p.name}</span></button>`).join('');
$$('[data-player]').forEach(b=>b.addEventListener('click',()=>{const p=players.find(p=>p.id===+b.dataset.player);b.classList.remove('jump');void b.offsetWidth;b.classList.add('jump');toast(p.name+'도 함께 가요!');setTimeout(()=>b.classList.remove('jump'),1100)}));
const nav=window.TeamNavigation;
nav.initializeKakao();
$$('[data-place]').forEach(el=>{const key=el.dataset.place,p=places[key];el.innerHTML=`<div class="place-info-header"><h4>주소와 주차</h4><button data-copy="${key}" aria-label="${p.name} 주소 복사">주소 복사</button></div><p class="address">${p.address}</p><div class="info-row"><b>주차</b><span>${p.parking}</span></div><div class="info-row"><b>교통</b><span>${p.transit}</span></div><div class="route-actions"><a href="${nav.webMap(p)}" target="_blank" rel="noopener noreferrer"><span class="naver-n">N</span> 웹 지도</a><button class="route-open" data-route="${key}">지도 앱으로 길찾기 ↗</button></div>`});
async function copyText(text,message='주소를 복사했어요.'){try{await navigator.clipboard.writeText(text);toast(message)}catch{const ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;left:-9999px';document.body.append(ta);ta.select();const ok=document.execCommand('copy');ta.remove();toast(ok?message:'복사가 안 되면 주소를 길게 눌러 복사해 주세요.')}}
$$('[data-copy]').forEach(b=>b.addEventListener('click',()=>copyText(places[b.dataset.copy].address)));
let activePlace=places.book,appTimer=null;
function clearAppTimer(){clearTimeout(appTimer);appTimer=null}
addEventListener('pagehide',clearAppTimer);document.addEventListener('visibilitychange',()=>{if(document.hidden)clearAppTimer()});
function appFeedback(){clearAppTimer();$('#route-status').textContent='앱 열기를 요청했어요. 이동하지 않으면 아래 웹 지도를 이용해 주세요.';appTimer=setTimeout(()=>{if(!document.hidden)$('#route-status').textContent='아직 이 화면인가요? 앱 설치 여부를 확인하거나 웹 지도를 이용해 주세요.'},2200)}
$$('[data-route]').forEach(b=>b.addEventListener('click',()=>{const p=places[b.dataset.route];activePlace=p;const links=nav.links(p,navigator.userAgent,navigator.platform,navigator.maxTouchPoints);$('#route-title').textContent=p.name;$('#route-address').textContent=p.address;$('#route-status').textContent='';$('#route-web').href=nav.webMap(p);$('#route-links').innerHTML=`<a class="route-link naver" href="${links.naver}" ${links.mobile?'':'target="_blank" rel="noopener noreferrer"'} data-app="naver"><span>네이버 지도</span><small>${links.mobile?'자동차 길찾기':'장소 보기'} ↗</small></a><button class="route-link kakao" type="button" data-app="kakao"><span>카카오내비</span><small>길 안내 시작 ↗</small></button><a class="route-link tmap" href="${links.tmap}" data-app="tmap"><span>TMAP</span><small>길 안내 시작 ↗</small></a>`;$('#route-dialog').showModal();
 $$('[data-app]').forEach(link=>link.addEventListener('click',e=>{const app=link.dataset.app;
  if(app==='kakao'){
   if(!nav.initializeKakao()){ $('#route-status').textContent='카카오내비 연결을 준비하지 못했어요. 잠시 후 다시 누르거나 웹 지도를 이용해 주세요.';return; }
   if(!links.mobile){$('#route-status').textContent='카카오내비는 휴대폰에서 눌러 주세요. 컴퓨터에서는 아래 웹 지도를 이용하면 돼요.';return;}
   appFeedback();try{nav.startKakao(p)}catch(error){clearAppTimer();$('#route-status').textContent='카카오내비를 열지 못했어요. 아래 웹 지도를 이용해 주세요.'}return;
  }
  if(!links.mobile){if(app==='tmap'){e.preventDefault();$('#route-status').textContent='TMAP은 휴대폰에서 눌러 주세요. 컴퓨터에서는 아래 웹 지도를 이용하면 돼요.'}return}
  // Follow the anchor synchronously in this window to preserve the user's tap.
  // Do not window.open or await a timer before invoking a native app.
  appFeedback();
 }));
}));
$('#copy-address').addEventListener('click',()=>copyText(activePlace.address));
$('#copy-guide-link').addEventListener('click',()=>copyText(nav.SITE_URL+'/?v=3','안내 페이지 주소를 복사했어요. Safari나 Chrome의 주소창에 붙여넣어 주세요.'));
$('#share-link').addEventListener('click',()=>copyText(nav.SITE_URL+'/?v=3','안내 링크를 복사했어요. 단톡방에 붙여넣어 주세요.'));
$('#menu-image-open').addEventListener('click',()=>$('#menu-dialog').showModal());
$$('.close-modal').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
let ticking=false;function progress(){const doc=document.documentElement;const total=doc.scrollHeight-innerHeight;$('#reading-progress').style.width=(total>0?scrollY/total*100:0)+'%';const ids=['schedule','library','lunch','bowling','awards'];let active='';for(const id of ids)if($('#'+id).getBoundingClientRect().top<innerHeight*.45)active=id;$$('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===active);a.dataset.nav===active?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current')});ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(progress);ticking=true}},{passive:true});addEventListener('resize',progress);progress();
