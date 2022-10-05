import React, { useState, useEffect, useCallback } from 'react'
import { CheckSpell } from 'pinyin37'
import { Kanjis } from '../framework/kanji-show.js'
import './basic.css'

const Tong_Yong_Keys = [  
  {x: 140, y:-160, w: 60, h: 45, r: 14, code:  0, sym:'PLAY', en:true},
  {x: 220, y:-160, w: 60, h: 45, r: 14, code:  0, sym:'STOP', en:true},
  {x:-270, y:-160, w: 90, h: 45, r: 14, code: 27, sym:'ESC',  en:true},
  {x: 270, y:-100, w: 45, h: 45, r: 14, code: 48, sym:'0',    en:true},
  {x:-270, y:-100, w: 45, h: 45, r: 14, code: 49, sym:'1',    en:true},
  {x:-210, y:-100, w: 45, h: 45, r: 14, code: 50, sym:'2',    en:true},
  {x:-150, y:-100, w: 45, h: 45, r: 14, code: 51, sym:'3',    en:true},
  {x: -90, y:-100, w: 45, h: 45, r: 14, code: 52, sym:'4',    en:true},
  {x: -30, y:-100, w: 45, h: 45, r: 14, code: 53, sym:'5',    en:true},
  {x:  30, y:-100, w: 45, h: 45, r: 14, code: 54, sym:'6',    en:false},
  {x:  90, y:-100, w: 45, h: 45, r: 14, code: 55, sym:'7',    en:false},
  {x: 150, y:-100, w: 45, h: 45, r: 14, code: 56, sym:'8',    en:false},
  {x: 210, y:-100, w: 45, h: 45, r: 14, code: 57, sym:'9',    en:false},
  {x: 370, y:-100, w: 90, h: 45, r: 14, code:  8, sym:'⌫',   en:true},
  {x:-240, y: -40, w: 45, h: 45, r: 14, code: 81, sym:'q',    en:false},
  {x:-180, y: -40, w: 45, h: 45, r: 14, code: 87, sym:'w',    en:true},
  {x:-120, y: -40, w: 45, h: 45, r: 14, code: 69, sym:'e',    en:true},
  {x: -60, y: -40, w: 45, h: 45, r: 14, code: 82, sym:'r',    en:true},
  {x:   0, y: -40, w: 45, h: 45, r: 14, code: 84, sym:'t',    en:true},
  {x:  60, y: -40, w: 45, h: 45, r: 14, code: 89, sym:'y',    en:true},
  {x: 120, y: -40, w: 45, h: 45, r: 14, code: 85, sym:'u',    en:true},
  {x: 180, y: -40, w: 45, h: 45, r: 14, code: 73, sym:'i',    en:true},
  {x: 240, y: -40, w: 45, h: 45, r: 14, code: 79, sym:'o',    en:true},
  {x: 300, y: -40, w: 45, h: 45, r: 14, code: 80, sym:'p',    en:true},
  {x:-210, y:  20, w: 45, h: 45, r: 14, code: 65, sym:'a',    en:true},
  {x:-150, y:  20, w: 45, h: 45, r: 14, code: 83, sym:'s',    en:true},
  {x: -90, y:  20, w: 45, h: 45, r: 14, code: 68, sym:'d',    en:true},
  {x: -30, y:  20, w: 45, h: 45, r: 14, code: 70, sym:'f',    en:true},
  {x:  30, y:  20, w: 45, h: 45, r: 14, code: 71, sym:'g',    en:true},
  {x:  90, y:  20, w: 45, h: 45, r: 14, code: 72, sym:'h',    en:true},
  {x: 150, y:  20, w: 45, h: 45, r: 14, code: 74, sym:'j',    en:true},
  {x: 210, y:  20, w: 45, h: 45, r: 14, code: 75, sym:'k',    en:true},
  {x: 270, y:  20, w: 45, h: 45, r: 14, code: 76, sym:'l',    en:true},
  {x:-180, y:  80, w: 45, h: 45, r: 14, code: 90, sym:'z',    en:true},
  {x:-120, y:  80, w: 45, h: 45, r: 14, code: 88, sym:'x',    en:false},
  {x: -60, y:  80, w: 45, h: 45, r: 14, code: 67, sym:'c',    en:true},
  {x:   0, y:  80, w: 45, h: 45, r: 14, code: 86, sym:'v',    en:false},
  {x:  60, y:  80, w: 45, h: 45, r: 14, code: 66, sym:'b',    en:true},
  {x: 120, y:  80, w: 45, h: 45, r: 14, code: 78, sym:'n',    en:true},
  {x: 180, y:  80, w: 45, h: 45, r: 14, code: 77, sym:'m',    en:true},
  {x:  60, y: 140, w:270, h: 45, r: 14, code: 32, sym:'1',    en:true}
]
const dict = {
  'ba':     ['扒得高跌得重,ba1.de5.gao1.die2.de5.jhong4','拔犀擢象,ba2.si1.jhuo2.siang4','火把,huo3.ba3','老爸,lao3.ba4,','好吧,hao3.ba5'],
  'bo':     ['波瀾,bo1.lan2','博士,bo2.sh4','跛蹇,bo3.jian3','巨擘,jyu4.bo4','蘿蔔,luo2.bo5'],
  'bai':    ['掰開,bai1.kai1','白色,bai2.se4','百般刁難,bai3.ban.diao.nan2','拜訪,bai4.fang3','*'],
  'bei':    ['岣嶁碑,gou3.lou3.bei1','*','北方,bei3.fang1','備戰,bei4.jhan4','好好學唄,hao3.hao3.syue2.bei5'],
  'bao':    ['麵包,mian4.bao1','薄餅,bo2.bing3','堡壘,bao3.lei3','報李投桃,bao4.li3.tou2.tao1','寶貝,bao3.bei4'],
  'ban':    ['斑斕,ban1.lan2','*','版本,ban3.ben3','北半球,bei3.ban4.ciou2','*'],
  'ben':    ['奔跑,ben1.pao3','*','本壘,ben3.lei3','愚笨,yu2.ben4','*'],
  'bang':   ['幫忙,bang1.mang2','*','綁赴市曹,bang3.fu4.sh4.cao2','鷸蚌相爭,yu4.bang4.siang1.jheng','*'],
  'beng':   ['崩坍,beng1.tan1','甭說了,beng2.shuo1.le5','-','蹦躂,beng4.ta4','*'],
  'bi':     ['逼迫,bi1.po4','鼻祖,bi2.zu3','筆,bi3','必須,bi4.syu1,','*'],
  'bie':    ['鼈,bie1','別宮祭江,bie2.gong1.ji4.jiang1','乾癟,gan1.bie3','彆氣,bie4.ci4','*'],
  'biao':   ['標本,biao1.ben3','*','懷錶,huei2.biao3','魚鰾,yu2.biao4','*'],
  'bian':   ['邊界,bian1.jie4','*','扁豆,bian3.dou4','變化,bian4.hua4','*'],
  'bin':    ['濱海,bin1.hai3','*','*','出殯入殮,chu1.bing4.ru4.lian4','*'],
  'bing':   ['兵廚之擾,bing1.chu2.jh1.rao3','*','餅乾,bing3.gan1','並行不悖,bing4.sing2.bu2.bei4','*'],
  'bu':     ['餔糟啜醨,bu1.zao1.chuo4.li2','白醭,bai2.bu2','裨補闕漏,bi4.bu3.cyue1.lou4','布帛,bu4.bo2','*'],
  'pa':     ['馬趴,ma3.pa1','爬山,pa2.shan1','*','害怕,hai4.pa4','*'],
  'po':     ['潑墨山水,po1.mo4.shan1.shuei3','婆娑起舞,po2.suo1.ci3.wu3','頗佳,po3.jia1','突破,tu2.po4','婆婆,po2.po5'],
  'pai':    ['拍案叫絕,pai1.an4.jiao4.jyue2','排隊,pai2.duei4','-','派遣,pai4.cian3','*'],
  'pei':    ['美人胚子,mei3.ren2.pei1.z5','陪伴,pei2.ban4','-','鸞鳳之配,luan2.fong4.jh1.pei4','*'],
  'pao':    ['拋繡球,pao1.siou4.ciou2','袍澤,pao2.ze2','奔跑,ben1.pao3','泡沫紅茶,pao4.mo4.hong2.cha2','*'],
  'pou':    ['-','抔土未乾,pou2.tu3.wei4.gan1','蠹啄剖梁柱,du4.jhuo2.pou3.liang2.jhu4','*','*'],
  'pan':    ['潘陸江海,pan1.lu4.jiang1.hai3','涅槃,nie4.pan2','-','拚命,pan4.ming4','*'],
  'pen':    ['噴泉,pen1.cyuan2','盆地,pen2.di4','-','*','*'],
  'pang':   ['乒乓球,ping1.pang1.ciou2','旁礴,pang2.bo2','開嗙,kai1.pang3','心寬體胖,sin1.kuan1.ti3.pang4','*'],
  'peng':   ['烹飪鼎鼐,peng1.ren4.ding3.nai4','鯤鵬展翅,kun1.peng2.jhan3.ch4','捧腹,peng3.fu4','碰巧,peng4.ciao3','*'],
  'pi':     ['批郤導窾,pi1.si4.dao3.kuan3','豹死留皮,bao4.s3.liou2.pi2','癖好,pi3.hao4','譬喻,pi4.yu4','*'],
  'pie':    ['驚鴻一瞥,jing1.hong2.yi1.pie1','*','左撇子,zuo3.pie3.z5','嫳屑,pie4.sie4','*'],
  'piao':   ['飄緲,piao1.miao3','簞瓢,dan1.piao2','餒殍相望,nei3.piao3.siang1.wang4','投票,tou2.piao4','*'],
  'pian':   ['篇幅,pian1.fu2','胼手胝足,pian2.shou3.jh1.zu2','-','片假名,pian4.jia3.ming2','*'],
  'pin':    ['通用拼音,tong1.yong4.pin1.yin1','頻率,pin2.lyu4','品格,pin3.ge2','牝牡驪黃,pin4.mu3.li2.huang2','*'],
  'ping':   ['娉娉裊裊,ping1.ping1.niao3.niao3','平衡,ping2.heng2','-','聘請,ping4.cing3','*'],
  'pu':     ['前仆後繼,cian2.pu1.hou4.ji4','樸質,pu2.jh2','普遍,pu3.bian4','曝露,pu4.lu4','*'],
  'ma':     ['媽祖,ma1.zu3','麻油,ma2.you2','螞蟻,ma3.yi3','漫罵,man4.ma4','癩蛤蟆,lai4.ha2.ma5'],
  'mo':     ['揣摸,chuai3.mo1','摩滅,mo2.mie4','抹淚揉眵,mo3.lei4.rou2.ch1','筆墨,bi3.mo4','-'],
  'me':     ['*','*','*','*','沒什麼,mei2.she2.me5'],
  'mai':    ['*','陰霾,yin1.mai2','買賣,mai3.mai4','麥芽糖,mai4.ya2.tang2','*'],
  'mei':    ['*','玫瑰花,mei2.guei5.hua1','里仁為美,li3.ren2.wei2.mei3','狐媚猿攀,hu2.mei4.yuan2.pan1','妹妹,mei4.mei5'],
  'mao':    ['貓毛,mao1.mao2','苞茅,bao1.mao2','卯酉參辰,mao3.you3.shen1.chen2','茂密,mao4.mi4','*'],
  'mou':    ['*','謀略,mou2.lyue4','某個,mou3.ge4','-','*'],
  'man':    ['閩語稱么兒為屘囝,min2.yu3.cheng1.yao1.er2.wei2.man1.jian3','蠻針瞎灸,man2.jhen1.sia1.jiou3','滿目荊榛,man3.mu4.jing1.jhen1','慢跑,man4.pao3','*'],
  'men':    ['悶熱,men1.re4','枇杷門巷,pi2.pa2.men2.siang4','-','燜煮,en4.jhu3','他們倆,ta1.men5.lia3'],
  'mang':   ['*','幫忙,bang1.mang2','雲莽莽,yun2.mang3.mang3','-','*'],
  'meng':   ['矇頭轉向,meng1.tou2.jhuan4.siang4','車笠之盟,che1.li4.jh1.meng2','攫戾執猛,jyue2.li4.jh2.meng3','夢想,meng4.siang3','*'],
  'mi':     ['瞇眼,mi1.yan3','斷虀畫糜,duan4.ji1.hua4.mi2','弭謗,mi3.bang4','蜂蜜,fong1.mi4','*'],
  'mie':    ['羊咩咩的叫著,yang2.mie1.mie1.de5.jiao4.jhe5','*','-','誣衊,wu1.mie4','*'],
  'miao':   ['喵喵,miao1.miao1','揠苗助長,ya4.miao2.jhu4.jhang3','讀秒,du2.miao3','廟謨,miao4.mo2','*'],
  'miou':   ['*','*','*','繩愆糾謬,sheng2.cian1.jiou1.miou4','*'],
  'mian':   ['*','綿邈,mian2.miao3','免疫力,mian3.yi4.li4','面頰,mian4.jia2','*'],
  'min':    ['*','民族,min2.zu2','敏銳,min3.ruei4','*','*'],
  'ming':   ['*','名覆金甌,ming2.fu4.jin1.ou1','酩酊大醉,ming3.ding3.da4.zuei4','生命,sheng1.ming4','*'],
  'mu':     ['*','模樣,mu2.yang4','畎畝,cyuan3.mu3','美人遲暮,mei3.ren2.ch2.mu4','*'],
  'fa':     ['伐毛洗髓,fa1.mao2.si3.suei3','罰酒,fa2.jiou3','髮髻,fa3.ji4','琺瑯質,fa4.lang2.jh2','*'],
  'fo':     ['*','伊闕佛龕,yi1.cyue4.fo2.kan1','*','*','*'],
  'fei':    ['腥羶緋聞,sing1.shan1.fei1.wun2','肥馬輕裘,fei2.ma3.cing1.ciou2','誹謗,fei3.bang4','花費,hua1.fei4','*'],
  'fou':    ['*','芣苡,fou2.yi3','否定,fou3.ding4','*','*'],
  'fan':    ['幡然悔悟,fan1.ran2.huei3.wu4','繁文吝嗇,fan2.wun2.lin4.se4','返鄉,fan3.siang1','飯糰,fan4.tuan2','*'],
  'fen':    ['擘兩分星,bo4.liang3.fen1.sing1','焚林而畋,fen2.lin2.er2.tian2','麵粉,mian4.fen3','振奮,jhen4.fen4','*'],
  'fang':   ['方法,fang1.fa3','防衛,fang2.wei4','訪問,fang3.wun4','毛寶放龜,mao2.bao3.fang4.guei1','*'],
  'fong':   ['風林火山,fong1.lin2.huo3.shan1','逢迎拍馬,fong2.ying2.pai1.ma3','唪經,fong3.jing1','諷刺,fong4.c4','*'],
  'fu':     ['孵育,fu1.yu4','服務,fu2.wu4','府衙,fu3.ya2','涸轍之鮒,he2.che4.jh1.fu4','*'],
  'da':     ['搭配,da1.pei4','韃靼,da2.da2','插科打諢,cha1.ke1.da3.hun4','大學,da4.syue2','疙瘩,ge1.da5'],
  'de':     ['*','侔德覆載,mou2.de2.fu4.zai4','*','*','和藹的,he2.ai3.de5'],
  'dai':    ['待遇,dai4.yu4','*','歹命,dai3.ming4','褒衣博帶,bao1.yi1.bo2.dai4','*'],
  'dei':    ['*','*','做人得厚道,zuo4.ren2.dei3.hou4.dao4','*','*'],
  'dao':    ['刀叉,dao1.cha1','捯線,dao2.sian4','島嶼,dao3.yu3','稻田,dao4.tian2','*'],
  'dou':    ['全家都去兜風,cyuan2.jia1.dou1.cyu4.dou1.fong1','*','北斗,bei3.dou3','豆漿,dou4.jiang1','*'],
  'dan':    ['單據,dan1.jyu4','-','膽識,dan3.sh4','誕生,da4.sheng1','*'],
  'dang':   ['當罏紅袖,dang1.lu2.hong2.siou4','*','鄰里鄉黨,lin2.li3.siang1.dang3','拂盪,fu2.dang4','*'],
  'deng':   ['燈光,deng1.guang1','*','等級,deng3.ji2','板凳,ban3.deng4','*'],
  'di':     ['滴瀝,di1.li4','洗滌,si3.di2','文化底蘊,wun2.hua4.di3.yun4','傳遞,chuan2.di4','弟弟,di4.di5'],
  'die':    ['沙嗲,sha1.die1','蝴蝶,hu2.die2','*','-','爹爹,die1.die5'],
  'diao':   ['雕刻,diao1.ke4','*','吊兒啷噹,diao3.er2.lang1.dang1','煙波釣徒,yan1.bo1.diao4.tu2','*'],
  'diou':   ['丟棄,diou1.ci4','*','*','*','*'],
  'dian':   ['巔峰,dian1.fong1','*','碘酒,dian3.jiou3','魯殿靈光,lu3.dian4.ling2.guang1','*'],
  'ding':   ['西門町,si1.men2.ding1','*','頂尖,ding3.jian1','訂閱,ding4.yue4','*'],
  'du':     ['督導,du1.dao3','韞櫝未酤,yun4.du2.wei4.gu1','篤定,du3.ding4','肚量,du4.liang4','*'],
  'duo':    ['多寡,duo1.gua3','奪取,duo2.cyu3','躲避,duo3.bi4','懶惰,lan3.duo4','耳朵,er3.duo5'],
  'duei':   ['堆砌,duei1.ci4','*','*','隊伍,duei4.wu5','*'],
  'duan':   ['端詳,duan1.siang2','*','庇短,bi4.duan3','夢斷黃粱,meng4.duan4.huang2.liang2','*'],
  'dun':    ['蹲坐,dun1.zuo4','*','盹睡,dun3.shuei4','矛盾,mao2.dun4','*'],
  'dong':   ['春蒐夏苗秋獮冬狩,chun1.sou1.sia4.miao2.ciou1.sian3.dong1.shou4','*','懵懂,meng3.dong3','山洞,shan1.dong4','*'],
  'ta':     ['吉他,ji2.ta1','*','金字塔,jin1.z4.ta3','腳踏車,jiao3.ta4.che1','*'],
  'te':     ['-','*','*','忐忑不安,tan3.te4.bu4.an1','*'],
  'tai':    ['懷胎,huai2.tai1','臺灣,tai1.wan1','*','生態,sheng1.tai4','太陽,tai4.yang2'],
  'tao':    ['韜光養晦,tao1.guang1.yang3.huei4','淘神,tao2.shen2','討伐,tao3.fa1','套路,tao4.lu4','*'],
  'tou':    ['偷閒,tou1.sian2','投畀豺虎,tou2.bi4.chai2.hu3','黈纊充耳,tou3.kuang4.chong1.er3','透明,tou4.ming2','念頭,nian4.tou5'],
  'tan':    ['攤牌,tan1.pai2','談判,tan2.pan4','坦克,tan3.ke4','炭火,tan4.huo3','*'],
  'tang':   ['薑湯,jiang1.tang1','唐詩,tang2.sh1','帑廥寖虛,tang3.kuai4.jin4.syu1','燙手山芋,tang4.shou3.shan1.yu4','*'],
  'teng':   ['-','紫藤,z3.teng2','*','*','*'],
  'ti':     ['梯田,ti1.tian2','提醒,ti2.sing3','體面,ti3.mian4','惕厲,ti4.li4','*'],
  'tie':    ['貼花,tie1.hua1','*','鐵路,tie3.lu4','蘭亭帖,lan2.ting2.tie4','*'],
  'tiao':   ['挑選,tiao1.syuan3','迢迢千里,tiao2.tiao2.cian1.li3','窈窕淑女,yao3.tiao3.shu2.nyu3','眺望,tiao4.wang4','*'],
  'tian':   ['添壽,tian1.shou4','甜點,tian2.dian3','殄瘁,tian3.cuei4','以規為瑱,yi3.guei1.wei2.tian4','*'],
  'ting':   ['牧豕聽經,mu4.sh3.ting1.jing1','停頓,ting2.dun4','挺立,ting3.li4','聽天由命,ting4.tian1.you2.ming4','*'],
  'tu':     ['禿鷹,tu1.ying1','地圖,di4.tu2','吐絲自縛,tu3.s1.z4.fu2','兔羅雉離,tu4.luo2.jh4.li2','*'],
  'tuo':    ['擺脫,bai3.tuo1','駝鳥,tuo2.niao3','妥善,tuo3.shan4','拓荒,tuo4.huang1','*'],
  'tuei':   ['推度,tuei1.duo4','頹圮,tuei2.pi3','僓然無矜,tuei3.ran2.wu2.jin1','蠶蛹蛻變,can2.yong3.tuei4.bian4','*'],
  'tuan':   ['湍急,tuan1.ji2','團結,tuan2.jie2','尋村轉疃,syun2.cun1.jhuan3.tuan3','彖辭,tuan4.c2','*'],
  'tun':    ['吞噬,tun1.sh4','臀鰭,tun2.ci2','油汆花生,you2.tun3.hua1.sheng1','褪色,tun4.se4','*'],
  'tong':   ['變通,bian4.tong1','童年,tong2.nian2','總統,zong3.tong3','悲慟,bei1.tong4','*'],
  'na':     ['-','拿手,na2.shou3','哪門子,na3.men2.z5','納悶,na4.men4','你又走哪,ni3.you4.zou3.na5'],
  'ne':     ['-','*','*','剛毅木訥,gang1.yi4.mu4.ne4','便是呢,bian4.sh4.ne5'],
  'nai':    ['*','-','有容乃大,you3.rong2.nai3.da4','耐人尋味,nai4.ren2.syun2.wei4','奶奶,nai3.nai5'],
  'nei':    ['*','*','若敖鬼餒,ruo4.ao2.guei3.nei3','攘外安內,rang2.wai4.an1.nei4','*'],  
  'nao':    ['孬種,nao1.jhong3','撾耳撓腮,jhua1.er3.nao2.sai1','腦筋,nao3.jin1','熱鬧,re4.nao4','*'],
  'nou':    ['*','譨譨,nou2.nou2','-','深耕易耨,shen1.geng1.yi4.nou4','*'],
  'nan':    ['囡囡,nan1.nan1','南金東箭,nan2.jin1.dong1.jian4','赧顏汗下,nan3.yan2.han1.sia4','災難,zai1.nan4','*'],
  'nen':    ['-','*','*','柔枝嫩條,rou2.jh1.nen4.tiao2','*'],
  'nang':   ['-','囊橐豐盈,nang2.tuo2.fong1.ying2','疇曩心跡,chou2.nang3.sin1.ji1','齉鼻兒,nang4.bi2.er1','嘟囔,du1.nang5'],
  'neng':   ['*','南能北秀,nan2.neng2.bei3.siou4','*','-','*'],
  'ni':     ['*','泥封函谷,ni2.fong1.han2.gu3','風光旖旎,fong1.guang1.yi3.ni3','桀逆放恣,jie2.ni4.fang4.z4','*'],
  'nie':    ['誑捏,kuang2.nie1','疲苶,pi2.nie2','*','沴孽,li4.nie4','*'],
  'niao':   ['*','*','鳥革翬飛,niao3.ge2.huei1.fei1','屁滾尿流,pi4.gun3.niao4.liou2','*'],
  'niou':   ['泡妞,pao4.niou1','版築飯牛,ban3.jhu2.fan4.niou2','扭腰,niou3.yao1','憋拗,bie1.niou4','*'],
  'nian':   ['樹底蔫花,shu4.di3.nian1.hua1','拈花微笑,nian2.hua1.wei2.siao4','捻熄,nian3.si2','念茲在茲,nian4.z1.zai4.z1','*'],
  'nin':    ['*','您好,nin2.hao3','-','*','*'],
  'niang':  ['*','舞孃,wu3.niang2','*','酒釀,jiou3.niang4','-'],
  'ning':   ['*','風度端凝,fong1.du4.duan1.ning2','擰開,ning3.kai1','嬖佞,bi4.ning4','*'],
  'nu':     ['*','奴顏婢睞,nu2.yan2.bi4.lai4','苫眉努目,shan1.mei2.nu3.mu4','怒不可遏,nu4.bu4.ke3.e4','*'],
  'nuo':    ['*','婀娜多姿,e1.nuo2.duo1.z1','-','季布衣諾,ji4.bu4.yi1.nuo4','*'],
  'nuan':   ['*','*','杏林春暖,sing4.lin2.chun1.nuan3','*','*'],
  'nun':    ['*','溫黁飄香,wun1.nun2.piao1.siang1','*','*','*'],
  'nong':   ['*','神農氏,shen2.nong2.sh4','-','弄獐宰相,nong4.jhang1.zai4.siang4','*'],
  'nyu':    ['*','*','女曰雞鳴,nyu3.yue1.ji1.ming2','愧恧,kuei4.nyu4','*'],
  'nyue':   ['*','*','*','南樓詠謔,nan2.lou2.yong3.nyue4','*'], 
  'la':     ['布達拉宮,bu4.da2.la1.gong1','剌心剌肝,la2.sin1.la2.gan1','喇嘛,la3.ma5','歲時伏臘,suei4.sh2.fu2.la4','啪啦,pa1.la5'],
  'le':     ['-','*','*','味如雞肋,wei4.ru2.ji1.le4','鐵了心,tie3.le5.sin1'],
  'lai':    ['*','蓬萊米,peng2.lai2.mi3','*','明眸善睞,ming2.mou2.shan4.lai4','*'],
  'lei':    ['勒緊,lei1.jin3','弊車羸馬,bi4.che1.lei2.ma3','壘球,lei3.ciou2','抹淚揉眵,mo3.lei4.rou2.ch1','-'],  
  'lao':    ['撈捕,lao1.bu3','牢騷,lao2.sao1','波瀾老成,bo1.lan2.lao3.cheng2','烙印,lao4.yin4','*'],
  'lou':    ['摟衣裳,lou1.yi1.shang5','粉骷髏,fen3.ku1.lou2','簍筐,lou3.kuang1','鏤彩摛文,lou4.cai3.ch1.wun2','-'],
  'lan':    ['-','波瀾壯闊,bo1.lan2.jhuang4.kuo4','瀏覽,liou2.lan3','濫觴,lan4.shang1','*'],
  'lang':   ['啷噹,lang1.dang1','瑯琊山,lang2.ye2.shan1','雋朗,jyun4.lang3','浪蝶狂蜂,lang4.die2.kuang2.fong1','*'],
  'leng':   ['*','模稜兩可,mo2.leng2.liang3.ke3','寒冷,han2.leng3','發楞,fa1.leng4','*'],
  'li':     ['哩嚕,li1.lu1','鳳梨,fong4.li2','鞭辟入裡,bian1.bi4.ru4.li3','立場,li4.chang3','好哩,hao3.li5'],
  'lia':    ['*','*','小夫妻倆,siao3.fu1.ci1.lia3','豁達明亮,huo4.da2.ming2.liang4','*'],
  'lie':    ['乾巴疵咧,gan1.ba5.c1.lie1','*','咧嘴,lie3.zuei3','齜牙挒嘴,z1.ya2.lie4.zuei3','-'],
  'liao':   ['撩衣破步,liao1.yi1.po4.bu4','聊天,liao2.tian1','了解,liao3.jie3','春寒料峭,chun1.han2.liao4.ciao4','*'],
  'liou':   ['溜冰,liou1.bing1','枕石漱流,jhen4.sh2.shu4.liou2','柳嚲鶯嬌,liou3.duo3.ying1.jiao1','六朝,liou4.chao2','*'],
  'lian':   ['*','蓮龕,lian2.kan1','杏臉桃腮,sing4.lian3.tao2.sai1','迷戀,mi2.lian4','*'],
  'lin':    ['-','臨風顧盼,lin2.fong1.gu4.pan4','憯懍,can3.lin3','脊令在原,ji3.ling4.zai4.yuan2','*'],
  'liang':  ['*','良宵美景,liang2.siao1.mei3.jing3','魑魅魍魎,ch1.mei4.wang3.liang3','直諒多聞,jh2.liang4.duo1.wun2','*'],
  'ling':   ['拎著,ling1.jhe5','壽陵匍匐,shou4.ling2.pu2.fu2','獨領風騷,du2.ling3.fong1.sao1','另眼相看,ling4.yan3.siang1.kan4','*'],
  'lu':     ['打呼嚕,da3.hu1.lu1','韓盧逐逡,han2.lu2.jhu2.cyun1','滷蛋,lu3.dan4','覆鹿尋蕉,fu4.lu4.syun2.jiao1','-'],
  'luo':    ['捋袖揎拳,luo1.siou4.syuan1.cyuan2','鸚鵡螺,ying1.wu3.luo2','袒裼裸裎,tan3.si2.luo3.cheng2','絡繹不絕,luo4.yi4.bu4.jyue2','-'],
  'luan':   ['*','鸞翔鳳翥,luan2.siang2.fong4.jhu4','孵卵,fu1.luan3','紊亂,wun4.luan4','*'],
  'lun':    ['掄拳,lun1.cyuan2','渾崙吞棗,hu2.lun2.tun1.zao3','-','侃侃正論,kan3.kan3.jheng4.lun4','*'],
  'long':   ['-','龍吟虎嘯,long2.yin2.hu3.siao4','攏絡,long3.luo4','巷弄,siang4.long4','*'],
  'lyu':    ['*','黔驢技窮,cian2.lyu2.ji4.cyong2','旅行,lyu3.sing2','黛綠年華,dai4.lyu4.nian2.hua2','*'],
  'lyue':   ['*','*','*','攻城掠地,gong1.cheng2.lyue4.di4','*'],
  'ga':     ['犄角旮旯,ji1.jiao3.ga1.la2','軋戲,ga2.si4','-','尷尬,gan1.ga4','-'],
  'ge':     ['投袂荷戈,tou2.mei4.he4.ge1','閣揆,ge2.kuei2','西施一舸逐鴟夷,si1.sh1.yi1.ge3.jhu2.ch1.yi2','各有千秋,ge4.you3.cian1.ciou1','這個人,jhe4.ge5.ren2'],
  'gai':    ['言簡意賅,yan2.jian3.yi4.gai1','*','怙惡不改,hu4.e4.bu4.gai3','畦溝灌溉,si1.gou1.guan4.gai4','*'],
  'gei':    ['*','*','黃鼠狼給雞拜年,huang2.shu3.lang2.gei3.ji1.bai4.nian2','*','*'],  
  'gao':    ['如皋射雉,ru2.gao1.she4.jh4','*','杲杲,gao3.gao3','典謨訓誥,dian3.mo2.syun4.gao4','*'],
  'gou':    ['篝火狐鳴,gou1.huo3.hu2.ming2','*','蠅營狗苟,ying2.ying2.gou3.gou3','肯堂肯構,ken3.tang2.ken3.gou4','*'],
  'gan':    ['乾餱以愆,gan1.hou2.yi3.cian1','*','感慨萬千,gan3.kai3.wan4.cian1','發紺,fa1.gan4','*'],
  'gen':    ['蘭根白芷,lan2.gen1.bai2.jh3','逗哏,dou4.gen2','話太艮,hua4.tai4.gen3','乾坤坎離震巽艮兌,cian2.kun1.kan3.li2.jhen4.syun4.gen4.duei4','*'],
  'gang':   ['天罡,tian1.gang1','*','港都,gang3.du1','槓鈴,gang4.ling2','*'],
  'geng':   ['深耕易耨,shen1.geng1.yi4.nou4','*','耿介,geng3.jie4','亙古,gen4.gu3','*'],
  'gu':     ['百年孤寂,bai3.nian2.gu1.ji2','骨頭,gu2.tou5','六穀有稻黍稷麥菽麻,liou4.gu3.you3.dao4.shu3.ji4.mai4.shu2.ma2','故鄉,gu4.siang1','姑姑,gu1.gu5'],
  'gua':    ['瓜瓞,gua1.die2','*','鰥寡孤獨,guan1.gua3.gu1.du2','牽掛,cian1.gua4','*'],
  'guo':    ['燉鍋,dun4.guo1','搴旗斬馘,cian1.ci2.jhan3.guo2','碗粿,wan3.guo3','白駒過隙,bai2.jyu1.guo4.si4','*'],
  'guai':   ['時乖運蹇,sh2.guai1.yun4.jian3','*','李鐵拐,li3.tie3.guai3','君子夬夬,jyun1.z3.guai4.guai4','*'],
  'guei':   ['麟鳳龜龍,lin2.fong4.guei1.long2','*','越軌,yue4.guei3','米珠薪桂,mi3.jhu1.sin1.guei4','*'],
  'guan':   ['濂洛關閩,lian2.luo4.guan1.min2','*','楚館秦樓,chu3.guan3.cin2.lou2','登鸛雀樓,deng1.guan4.cyue4.lou2','*'],
  'gun':    ['-','*','滾瓜爛熟,gun3.gua1.lan4.shou2','市井惡棍,sh4.jing3.e4.gun4','*'],
  'guang':  ['波光瀲灩,bo1.guang1.lian4.yan4','*','粗獷,cu1.guang3','逛街,guang4.jie1','*'],
  'gong':   ['秉公無私,bing3.gong1.wu2.s1','*','垂拱而治,chuei2.gong3.er2.jh4','貢禹彈冠,gong4.yu3.tan2.guan1','*'],
  'ka':     ['道德咖啡,dao4.de2.ka1.fei1','*','卡通漫畫,ka3.tong1.man4.hua4','喀拉蚩,ka4.la1.ch1','*'],
  'ke':     ['去煩蠲苛,cyu4.fan2.jyuan1.ke1','貝殼,bei4.ke2','怒猊渴驥,nu4.ni2.ke3.ji4','恪遵,ke4.zun1','*'],
  'kai':    ['開卷有益,kai1.jyuan4.you3.yi4','*','慷慨赴義,kang1.kai3.fu4.yi4','同仇敵愾,tong2.chou2.di2.kai4','*'],
  'kao':    ['尻輿神馬,kao1.yu2.shen2.ma3','*','考試,kao3.sh4','靠攏,kao4.long3','*'],
  'kou':    ['倒舄摳衣,dao4.si4.kou1.yi1','*','膾炙人口,kuai4.jh4.ren2.kou3','甯戚扣角,ning4.ci1.kou4.jiao3','*'],
  'kan':    ['不刊之典,bu4.kan1.jh1.dian3','*','侃侃而談,kan3.kan3.er2.tan2','鬼瞰其室,guei3.kan4.ci2.sh4','*'],
  'ken':    ['*','*','誠懇,cheng2.ken3','勒掯,le4.ken4','*'],
  'kang':   ['永爾康阜,yong3.er3.kang1.fu4','扛鋤頭,kang2.chu2.tou2','-','負隅頑抗,fu4.yu2.wan2.kang4','*'],
  'keng':   ['焚書坑儒,fen2.shu1.keng1.ru2','*','-','*','*'],
  'ku':     ['撫尸痛哭,fu3.sh1.tong4.ku1','*','酸甜苦辣,suan1.tian2.ku3.la4','資料庫,z1.liao4.ku4','*'],
  'kua':    ['大言非夸,da4.yan2.fei1.kua1','*','垮臺,kua3.tai2','橫跨歐亞大陸,heng2.kua4.ou1.ya4.da4.lu4','*'],
  'kuo':    ['-','-','-','廓落晨星,kuo4.luo4.chen2.sing1','*'],
  'kuei':   ['睥睨窺覦,bi4.ni4.kuei1.yu2','奪魁,duo2.kuei2','傀儡,kuei3.lei3','不虞匱乏,bu4.yu2.kuei4.fa2','*'],
  'kuan':   ['寬以待人嚴以律己,kuan1.yi3.dai4.ren2.yan2.yi3.lyu4.ji3','*','禮數款段,li3.shu4.kuan3.duan4','*','*'],
  'kun':    ['金友玉昆,jin1.you3.yu4.kun1','*','綑綁,kun3.bang3','困隘,kun4.ai4','*'],
  'kuang':  ['框架,kuang1.jia4','誑語,kuang2.yu3','懭悢不得志,kuang3.liang4.bu4.de2.jh4','盛況,sheng4.kuang4','*'],
  'kong':   ['太空梭,tai4.kong1.suo1','*','孔明借箭,kong3.ming2.jie4.jian4','控制,kong4.jh4','*'],
  'ha':     ['哈密瓜,ha1.mi4.gua1','癩蝦蟆,lai4.ha2.ma5','-','*','*'],
  'he':     ['喝茶,he1.cha2','褐藻,he2.zao3','*','恭賀,gong1.he4','-'],
  'hai':    ['嗨喲,hai1.yao1','孩提時光,hai2.ti2.sh2.guang1','韓彭葅醢,han2.peng2.jyu1.hai3','駭客,hai4.ke4','*'],
  'hei':    ['黑奴籲天錄,hei1.nu2.yu4.tian1.lu4','*','-','-','-'],
  'hao':    ['蒿目時艱,hao1.mu4.sh2.jian1','豪氣干雲,hao2.ci4.gan1.yun2','郝隆晒書,hao3.long2.shai4.shu1','號召,hao4.jhao4','*'],
  'hou':    ['鼾齁如雷,han1.hou1.ru2.lei2','乾餱以愆,gan1.hou2.yi3.cian1','河東獅吼,he2.dong1.sh1.hou3','皇天后土,huang2.tian1.hou4.tu3','*'],
  'han':    ['憨厚,han1.hou4','含蓼問疾,han2.liao3.wun4.ji2','子罕辭寶,z3.han3.c2.bao3','漢宮秋月,han4.gong1.ciou1.yue4','*'],
  'hen':    ['*','春夢無痕,chun1.meng4.wu2.hen2','羊狠狼貪,yang2.hen3.lang2.tan1','悔恨,huei3.hen4','*'],
  'hang':   ['皮頭夯腦,pi2.tou2.hang1.nao3','航班,hang2.ban1','-','沆瀣一氣,hang4.sie4.yi1.ci4','*'],
  'heng':   ['豐亨豫大,fong1.heng1.yu4.da4','恆久不渝,heng2.jiou3.bu4.yu2','*','飛來橫禍,fei1.lai2.heng4.huo4','*'],
  'hu':     ['呼吸,hu1.si1','胡吹亂謅,hu2.chuei1.luan4.zou1','水滸傳,shuei3.hu3.jhuan4','瓠巴鼓瑟,hu4.ba1.gu3.se4','嗎呼含糊,ma3.hu5.han2.hu2'],
  'hua':    ['春華秋實,chun1.hua1.ciou1.sh2','譁世取寵,hua2.sh4.cyu3.chong3','*','波磔點畫,bo1.jhe2.dian3.hua4','*'],
  'huo':    ['豁命,huo1.ming4','栩栩欲活,syu3.syu3.yu4.huo2','夥伴,huo3.ban4','或許,huo4.syu3','暖和,nuan3.huo5'],
  'huai':   ['*','螞蟻緣槐,ma3.yi3.yuan2.huai2','*','破屋壞垣,po4.wu1.huai4.yuan2','*'],
  'huei':   ['韋叡樹麾,wei2.ruei4.shu4.huei1','驀然回首,mo4.ran2.huei2.shou3','懺悔,chan4.huei3','匯率,huei4.lyu4','*'],
  'huan':   ['歡樂,huan1.le4','槃桓,pan2.huan2','浣滌,huan3.di2','眴煥,syuan4.huan4','*'],
  'hun':    ['葷素不忌,hun1.su4.bu2.ji4','魂魄,hun2.po4','玉石混淆,yu4.sh2.hun3.yao2,','飄茵落溷,piao1.yin1.luo4.huen4','*'],
  'huang':  ['荒謬,huang1.miou4','不遑枚舉,bu4.huang2.mei2.jyu3','謊言,huang3.yan2','晃蕩,huang4.dang4','*'],
  'hong':   ['轟炸,hong1.jha4','閎壯,hong2.jhuang4','哄騙,hong3.pian4','內鬨,nei4.hong4','*'],
  'ji':     ['激烈辯論,ji1.lie4.bian4.lun4','狼藉杯盤,lang2.ji2.bei1.pan2','脊椎,ji3.jhuei1','覬覦之志,ji4.yu2.jh1.jh4','*'],
  'jia':    ['蒹葭倚玉,jian1.jia1.yi3.yu4','戛然而止,jia2.ran2.er2.jh3','南岬之盟,nan2.jia3.jh1.meng2','稼穡,jia4.se4','*'],
  'jie':    ['街坊鄰舍,jie1.fang1.lin2.she4','櫛比鱗次,jie2.bi4.lin2.c4','解釋,jie3.sh4','世界,sh4.jie4','姊姊,jie3.jie5'],  
  'kuai':   ['喎斜,kuai1.sie2','*','巢關蒯相,chao2.guan1.kuai3.siang1','快雪時晴帖,kuai4.syue3.sh2.cing2.tie4','*'],
  'jiao':   ['膠漆相融,jiao1.ci1.siang1.rong2','咀嚼,jyu3.jyue2','擲筊祈願,jh2.jiao3.ci2.yuan4','建醮,jian4.jiao4','*'],
  'jiou':   ['鳩僭鵲巢,jiou1.jian4.cyue4.chao2','*','高陽酒徒,gao1.yang2.jiou3.tu2','歸咎,guei1.jiou4','舅舅,jiou4.jiou5'],
  'jian':   ['三緘其口,san1.jian1.ci2.kou3','*','作繭自縛,zuo4.jian3.z4.fu2','美澤鑑人,mei3.ze2.jian4.ren2','*'],
  'jin':    ['少不更事,shao4.bu4.jing1.sh4','*','謹慎,jin3.shen4','鞭辟近哩,bian1.bi4.jin4.li3','*'],
  'jiang':  ['江潯海裔,jiang1.syun2.hai3.yi4','*','獎掖後進,jiang3.yi4.hou4.jin4','匠石斫鼻,jiang4.sh2.jhuo2.bi2','*'],
  'jing':   ['去蕪存菁,cyu4.wu2.cun2.jing1','*','殲一警百,jian1.yi1.jing3.bai3','謐靜,mi4.jing4','*'],
  'jyu':    ['居心叵測,jyu1.sin1.po3.ce4','鞠躬盡瘁,jyu2.gong1.jin4.cuei4','民主選舉,min2.jhu3.syuan3.jyu3','劇團,jyu4.tuan2','*'],
  'jyue':   ['噘嘴,jyue1.zuei3','倔強,jyue2.jiang4','-','-','*'],
  'jyuan':  ['鐫心銘骨,jyuan1.sin1.ming2.gu3','*','席捲,si2.jyuan3','清新雋永,cing1.sin1.jyuan4.yong3','*'],
  'jyun':   ['均霑,jyun1.jhan1','*','窘態,jyun3.tai4','香菇也會長黴菌,siang1.gu1.ye3.huei4.jhang3.mei2.jyun4','*'],
  'jyong':  ['駉駉牡馬在坰之野,jyong1.jyong1.mu3.ma3.zai4.jhong1.jh1.ye3','*','炯心如丹凝,jyong3.sin1.ru2.dan1.ning2','-','*'],
  'ci':     ['七彩繽紛,ci1.cai3.bin1.fen1','良莠不齊,liang2.you3.bu4.ci2','丹唇啟秀,dan1.chun2.ci3.siou4','管弦樂器,guan3.sian2.yue4.ci4','*'],
  'cia':    ['蒼蠅掐了頭,cang1.ying2.cia1.le5.tou2','*','酠苦酒也,cia3.ku3.jiou3.ye3','融洽,rong2.cia4','*'],
  'cie':    ['切磋琢磨,cie1.cuo1.jhuo2.mo2','番茄濃湯,fan1.cie2.nong2.tang1','載歌且舞,zai3.ge1.cie3.wu3','愜意,cie4.yi4','*'],  
  'ciao':   ['盎盂相敲,ang4.yu2.siang1.ciao1','楓橋夜泊,fong1.ciao2.ye4.bo2','悄悄話,ciao3.ciao3.hua4','翹楚俊俏,ciao2.chu3.jyun4.ciao4','*'],
  'ciou':   ['一丘之貉,yi1.ciou1.jh1.he2','犰狳,ciou2.yu2','羹藜唅糗,geng1.li2.han2.ciou3','*','*'],
  'cian':   ['遷喬之喜,cian1.ciao2.jh1.si3','宵夙虔竦,siao1.su4.cian2.song3','才蔽識淺,cai2.bi4.sh4.cian3','欠缺籌碼,cian4.cyue1.chou2.ma3','*'],
  'cin':    ['欽佩,cin1.pei4','戴逵破琴,dai4.kuei2.po4.cin2','桂宮柏寢,guei4.gong1.bo2.cin3','沁入肺腑,cin4.ru4.fei4.fu3','*'],
  'ciang':  ['槍砲彈藥,ciang1.pao4.dan4.yao4','牆壁穩固,ciang2.bi4.wun3.gu4,','搶劫,ciang3.jie2','嗆鼻,ciang4.bi2','*'],
  'cing':   ['青睞,cing1.lai4','情愫羈絆,cing2.su4.ji1.ban4','頃刻,cing3.ke4','罄竹難書,cing4.jhu2.nan2.shu1','*'],
  'cyu':    ['屯墾區,tun2.ken3.cyu1','運糧漕渠,yun4.liang2.cao2.cyu2','顧曲周郎,gu4.cyu3.jhou1.lang2','妙趣,miao4.cyu4','*'],
  'cyue':   ['乙炔,yi3.cyue1','瘸腿,cyue2.tuei3','*','精確,jing1.cyue4','*'],
  'cyuan':  ['圈套,cyuan1.tao4','蜷伏,cyuan2.fu2','繾綣難捨,cian3.cyuan3.nan2.she3','勸善黜惡,cyuan4.shan4.chu4.e4','*'],
  'cyun':   ['韓盧逐逡,han2.lu2.jhu2.cyun1','裙布荊釵,cyun2.bu4.jing1.chai1','*','*','*'],
  'cyong':  ['浩瀚穹蒼,hao4.han4.cyong1.cang1','瓊漿玉液,cyong2.jiang1.yu4.yi4','-','*','*'],
  'si':     ['銖兩悉稱,jhu1.liang3.si1.cheng4','息鼓偃旗,si2.gu3.yan3.ci2','徙木立信,si3.mu4.li4.sin4','潟湖,si4.hu2','*'],
  'sia':    ['岈然深邃,sia1.ran2.shen1.suei4','黠慧,sia2.huei4','-','嚇昏,sia4.hun1','*'],
  'sie':    ['蠍蠍螫螫,sie1.sie1.jhe1.jhe1','協力,sie2.li4','歃血為盟,sha4.sie3.wei2.meng2','漏洩春光,lou4.sie4.chun1.guang1','謝謝,sie4.sei5'],  
  'siao':   ['消暑,siao1.shu3','洨河,siao2.he2','家喻戶曉,jia1.yu4.hu4.siao3','學校,syue2.siao4','*'],
  'siou':   ['姱修,kua1.siou1','*','薄田朽屋,bo2.tian2.siou3.wu1','鄂君繡被,e4.jyun1.siou4.bei4','*'],
  'sian':   ['纖維,sian1.wei2','更弦易轍,geng1.sian2.yi4.che4','苔蘚蕨類,tai2.sian3.jyue2.lei4','飛觥獻斝,fei1.gong1.sian4.jia3','*'],
  'sin':    ['歆羨,sin1.sian4','溉之釜鬵,gai4.jh1.fu3.sin2','伈伈睍睍,sin3.sin3.sian4.sian4','覆餗之釁,fu4.su4.jh1.sin4','*'],
  'siang':  ['鄉梓,siang1.z3','慈祥,c2.siang2','飛芻轉餉,fei1.chu2.jhuan3.siang3','難望項背,nan2.wang4.siang4.bei4','*'],
  'sing':   ['腥羶,sing1.shan1','潛形匿跡,cian2.sing2.ni4.ji1','反躬自省,fan3.gong1.z4.sing3','幸福,sing4.fu2','*'],
  'syu':    ['供需,gong1.syu1','徐穉置芻,syu2.jh4.jh4.chu2','和煦,he2.syu3','旭日東昇,syu4.r4.dong1.sheng1','-'],
  'syue':   ['雨靴,yu3.syue1','踅門瞭戶,syue2.men2.liao4.hu4','陽春白雪,yang2.chun1.bai2.syue3','剝削,bo1.syue4','*'],
  'syuan':  ['人權宣言,ren2.cyuan2.syuan1.yan2','室如懸磬,sh4.ru2.syuan2.cing4','選擇,syuan3.ze2','炫晝縞夜,syuan4.jhou4.gao3.ye4','*'],
  'syun':   ['勛章,syun1.jhang1','巡緝,syun2.ci4','*','遜色,syun4.se4','*'],
  'syong':  ['洶湧澎湃,syong1.yong3.peng1.pai4','黑熊,hei1.syong2','*','-','*'],
  'jh':     ['隻手遮天,jh1.shou3.jhe1.tian1','怠忽職守,dai4.hu1.jh2.shou3','洛陽紙貴,luo4.yang2.jh3.guei4','智慧,jh4.huei4,','*'],
  'jha':    ['菜渣,cai4.jha1','炸雞薯條,jha2.ji1.shu3.tiao2','眨眼,jha3.yan3','炸彈,jha4.dan4','*'],
  'jhe':    ['攀轅遮道,pan1.yuan2.jhe1.dao4','哲學,he2.syue2','赭衣塞路,jhe3.yi1.se4.lu4','倒吃甘蔗,dao4.ch1.gan1.jhe4','白閒著,bai2.sian2.jhe5'],
  'jhai':   ['齋戒沐浴,jhai1.jie4.mu4.yu4','宅心仁厚,jhai2.sin1.ren2.hou4','冤家路窄,yuan1.jia1.lu4.jhai3','債台高築,jhai4.tai2.gao1.jhu2','*'], 
  'jhao':   ['朝令夕改,jhao1.ling4.si4.gai3','棉花店著火,mian2.hua1.dian4.jhao2.huo3','沼澤,jhao3.ze2','護照,hu4.jhao4,','*'],
  'jhou':   ['破釜沉舟,po4.fu3.chen2.jhou1','充棟折軸,chong1.dong4.jhe2.jhou2','捉襟露肘,jhuo1.jin1.lu4.jhou3','宇宙,yu3.jhou4','*'],
  'jhan':   ['望杏瞻榆,wang4.sing4.jhan1.yu2','*','燈盞熒熒,deng1.jhan3.ying2.ying2','暫勞永逸,jhan4.lao2.yong3.yi4','*'],
  'jhen':   ['珍饈佳餚,jhen1.siou1.jia1.yao2','*','縝密細膩,jhen3.mi4.si4.ni4','鎮懾威嚇,jhen4.jhe2.wei1.he4','*'],
  'jhang':  ['彰善癉惡,jhang1.shan4.dan4.e4','*','漲潮,jhang3.chao2','仗義執言,jhang4.yi4.jh2.yan2','*'],
  'jheng':  ['風靡雲蒸,fong1.mi3.yun2.jheng1','*','整頓糜爛之風,jheng3.dun4.mi2.lan4.jh1.fong1','鄭衛桑間,jheng4.wei4.sang1.jian1','*'],
  'jhu':    ['豬八戒戴花,jhu1.ba1.jie4.dai4.hua1','破竹建瓴,po4.jhu2.jian4.ling2','囑託,jhu3.tuo1','駐軍,jhu4.jyun1','*'],
  'jhua':   ['抓藥,jhua1.yao4','*','魔爪,mo2.jhua3','*','*'],
  'jhuo':   ['桌椅,jhuo1.yi3','濁水溪,jhuo2.shuei3.si1','*','*','*'],
  'jhuai':  ['胳膊拽了,ge1.bo5.jhuai1.le1,','*','鴨跩鵝行,ya1.jhuai3.e2.sing2','拽欛扶梨,jhuai4.ba4.fu2.li2','*'],
  'jhuei':  ['窮寇莫追,cyong2.kou4.mo4.jhuei1','*','-','昭王墜屨,jhao1.wang2.jhuei4.jyu4','*'],
  'jhuan':  ['砌磚塊,ci4.jhuan1.kuai4','*','轉移,jhuan3.yi2,','撰寫,jhuan4.sie3','*'],
  'jhun':   ['諄諄告誡,jhun1.jhun1.gao4.jie4','*','準備,jhun3.bei4','-','*'],
  'jhuang': ['裝瘋賣傻,jhuang1.fong1.mai4.sha3','*','-','撞擊,jhuang4.ji2','*'],
  'jhong':  ['終於,jhong1.yu2','*','腫脹,jhong3.jhang4','豆重榆瞑,dou4.jhong4.yu2.mian2','*'],
  'ch':     ['嗤之以鼻,ch1.jh1.yi3.bi2','池塘,ch2.tang2','尺波電謝,ch3.bo1.dian4.sie4','熾熱,ch4.re4','*'],
  'cha':    ['差異,cha1.yi4','沏茶,ci1.cha2','蹅雨趕路,cha3.yu3.gan3.lu4','古剎,gu3.cha4','*'],
  'che':    ['奉轂後車,fong4.gu3.hou4.che1','*','扯空砑光,che3.kong1.ya4.guang1,','風馳電掣,fong1.ch2.dian4.che4','*'],
  'chai':   ['拆穿,chai1.chuan1','朋儕,peng2.chai2','-','蜂蠆有毒,fong1.chai4.you3.du2','*'], 
  'chao':   ['超越,chao1.yue4','巢穴,chao2.syue4','炒蛋,chao3.dan4','犁田耙田耖田碌碡,li2.tian2.pa2.tian2.chao4.tian2.lu4.du2','*'],
  'chou':   ['抽籤,chou1.cian1','天道酬勤,tian1.dao4.chou2.cin2','瞅睬,chou3.cai3','臭恭維,chou4.gong1.wei2','*'],
  'chan':   ['攙扶,chan1.fu2','蟾蜍,chan2.chu2','諂諛獻媚,chan3.yu2.sian4.mei4','懺悔,chan4.huei3','*'],
  'chen':   ['貪嗔痴,tan1.chen1.ch1','暗渡陳倉,an4.du4.chen2.cang1','踸踔而行,chen3.jhuo2.er2.sing2','一語成讖,yi1.yu3.cheng2.chen4','-'],
  'chang':  ['為虎作倀,wei4.hu3.zuo4.chang1','徜徉,chang2.yang2','欒櫨宏敞,luan2.lu2.hong2.chang3','酣暢淋漓,han1.chang4.lin2.li2','*'],
  'cheng':  ['撐竿跳,cheng1.gang1.tiao4','胸無城府,syong1.wu2.cheng2.fu3','騁馳,cheng3.ch2','稱心如意,cheng4.sin1.ru2.yi4','*'],
  'chu':    ['初寫黃庭,chu1.sie3.huang2.ting2','躊躇,chou2.chu2','處方箋,chu3.fang1.jian1','羝羊觸藩,di1.yang2.chu4.fan2','*'],
  'chuo':   ['戳印,chuo1.yin4','*','*','丰姿綽約,fong1.z1.chuo4.yue1','*'],
  'chuai':  ['搋麵,chuai1.mian4','膗膗胖胖,chuai2.chuai2.pang4.pang4','揣摹,chuai3.mo2','踹踢,chuai4.ti1','*'],
  'chuei':  ['炊煙,chuei1.yan1','羊裘垂釣,yang2.ciou2.chuei2.diao4','*','萬物炊累,wan4.wu4.chuei4.lei4','*'],
  'chuan':  ['芥川賞,jie4.chuan1.shang3','大筆如椽,da4.bi3.ru2.chuan2','命途多舛,ming2.tu2.duo1.chuan3','釵釧,chai1.chuan4','*'],
  'chun':   ['椿萱並茂,chun1.syuan1.bing4.mao4','純淨,chun2.jing4','蠢蠢欲動,chun3.chun3.yu4.dong4','*','*'],
  'chuang': ['窗明几淨,chuang1.ming2.ji3.jing4','床榻,chuang2.ta4','闖蕩江湖,chuang3.dang4.jiang1.hu2','愴悢傷懷,chuang4.liang4.shang1.huai2','*'],
  'chong':  ['衝突,chong1.tu2','夏蟲語冰,sia4.chong2.yu3.bing1','寵愛,chong3.ai4','炮銃,pao4.chong4','*'],
  'sh':     ['毛施淑姿,mao2.sh1.shu2.z1','芥拾青紫,jie4.sh2.cing1.z3','大使館,da4.sh3.guan3','士農工商,sh4.nong2.gong1.shang1','鑰匙,yao4.sh5'],
  'sha':    ['抹殺,mo3.sha1','幹啥,gan4.sha2','傻事,sha3.sh4','霎時,sha4.sh2','*'],
  'she':    ['放肆奢侈,fang4.s4.she1.ch3','妄畫蛇足,wang4.hua4.she2.zu2','捨本逐末,she3.ben3.jhu2.mo4','社稷,she4.ji4','*'],
  'shai':   ['日炙風篩,r4.jh4.fong1.shai1','*','擲骰子,jh2.shai3.z5','日曬雨淋,r4.shai4.yu3.lin2','*'],
  'shei':   ['*','休戚與共,siou1.ci1.yu3.gong4','*','*','*'],
  'shao':   ['馮諼燒券,fong2.syuan1.shao1.cyuan4','蕭韶九成,siao1.shao2.jiou3.cheng2','傲慢少禮,ao4.man4.shao3.li3','少女,shao4.nyu3','*'],
  'shou':   ['收購,shou1.gou4','成熟,cheng2.shou2','手,shou3','售,shou4','*'],
  'shan':   ['姍姍來遲,shan1.shan1.lai2.ch2','*','閃躲,shan3.duo3','班姬詠扇,ban1.ji1.yong3.shan4','*'],
  'shen':   ['熊經鳥申,syong2.jing1.niao3.shen1','神祇,shen2.ci2','審判,shen3.pan4','腹笥甚廣,fu4.s4.shen4.guang3','*'],
  'shang':  ['宮商角徵羽,gong1.shang1.jyue2.jh3.yu3','*','賞鑑,shang3.jian4','甚囂塵上,shen4.siao1.chen2.shang4','-'],
  'sheng':  ['生日,sheng1.r4','繩索,sheng2.suo3','節省,jie2.sheng3','剩餘,sheng4.yu2','*'],
  'shu':    ['擘窠書,bo4.ke1.shu1','伯仲叔季,bo2.jhong4.shu2.ji4','神仙眷屬,shen2.sian1.jyuan4.shu3','數學公式,shu4.syue2.gong1.sh4,','*'],
  'shua':   ['剔抽禿刷,ti1.chou1.tu1.shua1','*','戲耍,si4.shua3','-','*'],
  'shuo':   ['指桑說槐,jh3.sang1.shuo1.huai2','*','*','碩彥名儒,shuo4.yan4.ming2.ru2','*'],
  'shuai':  ['摔跤,shuai1.jiao1','*','甩掉,shuai3.diao4','元帥,yuan2.shuai4','*'],
  'shuei':  ['*','-','水源,shuei3.yuan2','稅金,shuei4.jin1','*'],
  'shuan':  ['栓塞,shuan1.se4','*','*','涮羊肉,shuan4.yang2.rou4','*'],
  'shun':   ['*','*','吮癰舐痔,shun3.yong1.sh4.jh4','舜日堯天,shun4.r4.yao2.tian1','*'],
  'shuang': ['雙親,shuang1.cin1','*','涼爽,liang2.shuang3','-','*'],
  'r':      ['-','*','*','日期,r4.ci2','*'],
  're':     ['*','-','粘花惹草,nian2.hua1.re3.cao3','熱浪,re4.lang4','*'],
  'rao':    ['*','饒恕,rao2.shu4','擾亂,rao3.luan4','繞道而行,rao4.dao4.er2.sing2','*'],
  'rou':    ['*','柔道,rou2.dao4','思緒紛糅,s1.syu4.fen2.rou3','肉,rou4','*'],
  'ran':    ['*','燃糠照薪,ran2.kang1.jhao4.sin1','耳濡目染,er3.ru2.mu4.ran3','*','*'],
  'ren':    ['*','辟人之士,bi4.ren2.jh1.sh4','風塵荏苒,fong1.chen2.ren3.ran3','嬋娟刃,chan2.jyuan1.ren4','*'],
  'rang':   ['*','豚蹄穰田,tun2.ti2.rang2.tian2','迥隔霄壤,jyong3.ge2.siao1.rang3','揖讓,yi1.rang4','*'],
  'reng':   ['扔棄,reng1.ci4','頻仍,pin2.reng2','-','-','*'],
  'ru':     ['*','茹古涵今,ru2.gu3.han2.jin1','豆腐乳,dou4.fu3.ru3','蒲鞭示辱,pu2.bian1.sh4.ru4','*'],
  'ruo':    ['*','-','*','虛懷若谷,syu1.huai2.ruo4.gu3','*'],
  'ruei':   ['*','蟹匡蟬緌,sie4.kuang1.chan2.ruei2','花蕊,hua1.ruei3','門闌藹瑞,men2.lan2.ai3.ruei4','*'],
  'ruan':   ['*','穿越堧垣,chuan1.yue4.gong1.dian4.ruan2.yuan2','阮囊羞澀,ruan3.nang2.siou1.se4','*','*'],
  'run':    ['*','黑唇黃犉,hei1.chun2.huang2.run2','*','抃風舞潤,bian4.fong1.wu3.run4','*'],
  'rong':   ['*','榮膺鶚薦,rong2.ying1.e4.jian4','冗贅,rong3.jhuei4','*','*'],
  'z':      ['錙銖,z1.jhu1','*','荊南杞梓,jing1.nan2.ci3.z3','醃漬,yan1.z4','筷子,kuai4.z5'],
  'za':     ['包紮,bao1.za1','騈肩雜遝,pian2.jian1.za2.ta4','-','*','*'],
  'ze':     ['*','沼澤,jhao3.ze2','-','昃晷忘餐,ze4.guei3.wang4.can1','*'],
  'zai':    ['栽秧種稻,zai1.yang1.jhong4.dao4','*','碗粿與擔仔麵,wan3.guo3.yu3.dan4.z3.mian4','再接再厲,zai4.jie1.zai4.li4','*'],
  'zei':    ['*','法令滋章盜賊多有,fa3.ling4.z1.jhang1.dao4.zei2.duo1.you3','*','*','*'], 
  'zao':    ['遭遇,zao1.yu4','鑿井,zao2.jing3','早晨,zao3.chen2','狗屁倒灶,gou3.pi4.dao3.zao4','*'],
  'zou':    ['諮諏善道,z1.zou1.shan4.dao4','*','飛書走檄,fei1.shu1.zou3.si2','奏樂,zou4.yue4','*'],
  'zan':    ['墮珥遺簪,duo4.er3.yi2.zan1','糌粑,zan2.ba1','攢錢,zan3.cian2','誇讚,kua1.zan4','*'],
  'zen':    ['-','*','怎麼,zen3.me5','媒譖誣陷,mei2.zen4.wu1.sian4','*'],
  'zang':   ['骯髒汙穢,ang1.zang1.wu1.huei4','*','駔儈掮客,zang3.kuai4.cian2.ke4','埋身魚腹,zang4.shen1.yu2.fu4','*'],
  'zeng':   ['增添喜氣,zeng1.tian1.si3.ci4','*','*','采蘭贈芍,cai3.lan2.zeng4.shao2','*'],
  'zu':     ['租賃契約,zu1.ren4.ci4.yue1','世嗣宦族,sh4.s4.huan4.zu2','越俎代庖,yue4.zu3.dai4.pao2','-','*'],
  'zuo':    ['-','今是昨非,jin1.sh4.zuo2.fei1','佐饔得嘗,zuo3.yong1.de2.chang2','高朋滿座,gao1.peng2.man3.zuo4','*'],
  'zuei':   ['羧酸,zuei1.suan1','*','顛脣簸嘴,dian1.chun2.bo3.zuei3','蕞爾小國,zuei4.er3.siao3.guo2','*'],
  'zuan':   ['鑽研鑽石,zuan1.yan2.zuan4.sh2','*','纂修,zuan3.siou1','賺騙感情,zuan4.pian4.gan3.cing2','*'],
  'zun':    ['敝屣尊榮,bi4.si3.zun1.rong2','*','撙詘謙抑,zun3.cyu1.cian1.yi4','炭烤虹鱒,tan4.kao3.hong2.zun4','*'],
  'zong':   ['嫠憂宗周,li2.you1.zong1.jhou1','*','戎馬倥傯,rong2.ma3.kong3.zong3','粿粽,guo3.zong4','*'],
  'c':      ['瑕疵,sia2.c1','白詞念賦,bai2.c2.nian4.fu4','顧此失彼,gu4.c3.sh1.bi3','次序,c4.syu4','*'],
  'ca':     ['擦拭,ca1.shih4','*','礤床兒,ca3.chuang2.er1','亂囃,luan4.ca4','*'],
  'ce':     ['*','*','*','簡策楮墨,jian3.ce4.chu3.mo4','*'],
  'cai':    ['猜謎,cai1.mi2','才華,cai2.hua2','披榛採蘭,pi1.jhen1.cai3.lan2','蔬菜,shu1.cai4','*'], 
  'cao':    ['操練,cao1.lian4','蕭規曹隨,siao1.guei1.cao2.suei2','草薙禽獮,cao3.ti4.cin2.sian3','糙米,cao4.mi3','*'],
  'cou':    ['*','*','*','湊巧,cou4.ciao3','*'],
  'can':    ['餐廳,can1.ting1','蠶絲,can2.s1','慘烈,can3.lie4','燦爛,can4.lan4','*'],
  'cen':    ['嵾嵯,cen1.cuo2','汗涔涔,han4.cen2.cen2','*','*','*'],
  'cang':   ['滄海桑田,cang1.hai3.sang1.tian2','藏鋒斂鍔,cang2.fong1.lian4.e4','*','*','*'],
  'ceng':   ['味噌湯,wei4.ceng1.tang1','曾經,ceng2.jing1','*','磨蹭,mo2.ceng4','*'],
  'cu':     ['粗魯,cu1.lu3','溯流徂源,su4.liou2.cu2.yuan2','*','一蹴而就,yi1.cu4.er2.jiou4','*'],
  'cuo':    ['蹉跎,cuo1.tuo2','嵯峨,cuo2.e2','諸務叢脞,jhu1.wu4.cong2.cuo3','錯愕,cuo4.e4','*'],
  'cuei':   ['催促,cuei1.cu4','-','璀璨瑰麗,cuei3.can4.guei1.li4','淬鍊,cuei4.lian4','*'],
  'cuan':   ['汆羊肉,cuan1.yang2.rou4','簇錦攢花,cu4.jin3.cuan2.hua1','*','篡改,cuan4.gai3','*'],
  'cun':    ['皮膚皴裂,pi2.fu1.cun1.lie4','存款,cun2.kuan3','忖度,cun3.duo4','詘寸伸尺,cu1.cun4.shen1.ch3','*'],
  'cong':   ['聰明伶俐,cong1.ming2.ling2.li4','諸務叢脞,jhu1.wu4.cong2.cuo3','*','-','*'],
  's':      ['斯文,s1.wun2','*','鹿死誰手,lu4.s3.shei2.shou3','天賜純嘏,tain1.s4.chun2.gu3','*'],
  'sa':     ['彌撒,mi2.sa1','*','瀟灑,siao1.sa3','淅淅颯颯,si1.si1.sa4.sa4','*'],
  'se':     ['*','*','*','晦澀俚俗,huei4.se4.li3.su2','*'],
  'sai':    ['腮紅,sai1.hong2','*','*','賽局,sai4.jyu2','*'], 
  'sao':    ['搔首踟躕,sao1.shou3.ch2.chu2','*','淡掃蛾眉,dan4.sao3.e2.mei2','靦腆害臊,mian3.tian3.hai4.sao4','*'],
  'sou':    ['搜神記,sou1.shen2.ji4','*','英才淵藪,ying1.cai2.yuan1.sou3','咳嗽,ke2.sou4','*'],
  'san':    ['三顧茅廬,san1.gu4.mao2.lu2','*','火傘高張,huo3.san3.gao1.jhang1','盛筵易散,sheng4.yan2.yi4.san4','*'],
  'sen':    ['毛骨森竦,mao2.gu3.sen1.song3','*','*','*','*'],
  'sang':   ['桑弧蓬矢,sang1.hu2.peng2.sh3','*','嗓音,sang3.yin1','采椽不斲,cai3.chuan2.bu4.jhuo2','*'],
  'seng':   ['情僧錄,cing2.seng1.lu4','*','*','*','*'],
  'su':     ['蘇黃米蔡,su1.huang2.mi3.cai4','民俗,min2.su2','*','謖爾,su4.er3','*'],
  'suo':    ['簑衣,suo1.yi1','*','鎖鑰,suo3.yao4','-','*'],
  'suei':   ['福履增綏,fu2.lyu3.zeng1.suei1','傍柳隨花,bang4.liou3.suei2.hua1','滫瀡,siou3.suei3','幽邃,you1.suei4','*'],
  'suan':   ['狻猊,suan1.ni2','*','一匴麻筍,yi1.suan3.ma2.sun3','吃蔥吃蒜不吃薑,ch1.cong1.ch1.suan4.bu4.ch1.jiang1','*'],
  'sun':    ['觥飯不及壺飧,gong1.fan4.bu4.ji2.hu2.sun1','*','卯榫,mao3.sun3','鮞魚潠白濤,er2.yu2.sun4.bai2.tao2','*'],
  'song':   ['崧生嶽降,song1.sheng1.yue4.jiang4','*','悚慄,song3.li4','千里送鵝毛,cian1.li3.song4.e2.mao2','*'],
  'a':      ['阿里山,a1.li3.shan1','嗄,a2','*','大阿哥,da4.a4.ge5','好啊,hao3.a5'],
  'o':      ['喔喲,o1.yao1','哦,o2','*','*','*'],
  'e':      ['阿房宮,e1.fang2.gong1','鵝毛筆,e2.mao2.bi3','噁心,e3.sin1','鱷魚,e4.yu2','呃,e5'],
  'ai':     ['哀悼悲慟,ai1.dao4.bei1.tong4','皚皚積雪,ai2.ai2.ji1.syue3','和藹,he2.ai3','愛心,ai4.sin1','唉呀,ai5.ya1'],
  'ei':     ['-','-','-','欸,ei4','*'],
  'ao':     ['凹透鏡,ao1.tou4.jing4','翱翔,ao2.siang2','棉襖,mian2.ao3','傲骨嶙峋,ao4.gu3.lin2.syun2','*'],
  'ou':     ['歐母畫荻,ou1.mu3.hua4.di2','狋吽牙者兩犬爭,yi2.ou2.ya2.jhe3.liang3.cyuan3.jheng1','偶數,ou3.shu4','嘔氣,ou4.ci4','*'],
  'an':     ['安平古堡,an1.ping2.gu3.bao3','啽默,an2.mo4','俺們,an3.men5','大旗色黯,da4.ci2.se4.an4','*'],
  'en':     ['覃恩,tan2.en1','*','*','摁扣兒,en4.kou4.er1','*'],
  'ang':    ['-','瞵視昂藏,lin2.sh4.ang2.cang2','-','睟面盎背,suei4.mian4.ang4.bei4','*'],
  'eng':    ['轡鞥,pei4.eng1','*','*','*','*'],
  'er':     ['-','魚禁鯤鮞,yu2.jin4.kun1.er2','耳朵,er3.duo5','不貳過,bu4.er4.guo4','*'],
  'yi':     ['諱疾忌醫,huei4.ji2.ji4.yi1','彝倫攸斁,yi2.lun2.you1.,du4','薏苡明珠,yi4.yi3.ming2.jhu1','詫異,cha4.yi4','*'],
  'ya':     ['鬢若對鴉,bin4.ruo4.duei1.ya1','衙官屈宋,ya2.guan1.cyu1.song4','風雅頌賦比興,fong1.ya3.song4.fu4.bi3.sing4','亞洲,ya4.jhou1','-'],
  'yo':     ['唉唷,ai1.yo1','*','*','*','*'],
  'ye':     ['因噎廢食,yin1.ye1.fei4.sh2','揶揄,yeh2.yu2','稗官野史,bai4.guan1.ye3.sh3','冶葉倡條,ye3.ye4.chang1.tiao2','佛爺,fo2.ye5'],
  'yai':    ['*','懸崖勒馬,syuan2.yai2.le4.ma3','*','*','*'],
  'yao':    ['邀請,yao1.cing3','搖曳生姿,yao2.yi4.sheng1.z1','舀水瓢,yao3.shuei3.piao2','童謠,tong2.yao2','-'],
  'you':    ['彝倫攸斁,yi2.lun2.you1.du4','旅遊,lyu3.you2','桑樞甕牖,sang1.shu1.wong4.you3','窯變天目釉,yao2.bian4.tian1.mu4.you4','*'],
  'yan':    ['煙霞痼疾,yan1.sia2.gu4.ji2','朝虀暮鹽,jhao1.ji1.mu4.yan2','夢魘,meng4.yan3','三讀定讞,san1.du2.ding4.yan4','*'],
  'yin':    ['殷鑑不遠,yin1.jian4.bu4.yuan3','莊舄越吟,jhuang1.si4.yue4.yin2','比顯興隱,bi3.sian3.sing4.yin3','樹蔭,shu4.yin4','*'],
  'yang':   ['池魚之殃,ch2.yu2.jh1.yang1','被髮佯狂,pi1.fa3.yang2.kuang2','人仰馬翻,ren2.yang3.ma3.fan1','布帆無恙,bu4.fan2.wu2.yang4','*'],
  'ying':   ['蜚英騰茂,fei1.ying1.teng2.mao4','瀛奎律髓,ying2.kuei2.lyu4.suei3','影響,ying3.siang3','聚螢映雪,jyu4.ying2.ying4.syue3','*'],
  'wu':     ['巫蠱,wu1.gu3','鳳止高梧,fong4.jh3.gao1.wu2','舞蹈,wu3.dao4','霧鬢風鬟,wu4.bin4.fong1.huan2','*'],
  'wa':     ['挖掘,wa1.jyue2','女娃,nyu3.wa2','碧瓦朱甍,bi4.wa3.jhu1.meng2','布襪青鞋,bu4.wa4.cing1.sie2','好哇,hao3.wa5'],
  'wo':     ['窩心,wo1.sin1','*','匡我不逮,kuang1.wo3.bu2.dai4','從中斡旋,cong2.jhong1.wo4.syuan2',','],
  'wai':    ['歪風邪氣,wai1.fong1.sie2.ci4','*','歪了腳,wai3.le5.jiao3','虎豹不外其爪,hu3.bao4.bu4.wai4.ci2.jhao3','*'],
  'wei':    ['威武不屈,wei1.wu3.bu4.cyu1','明德惟馨,ming2.de2.wei2.sin1','鮪魚,wei3.yu2','戍衛邊疆,shu4.wei4.bian1.jiang1','*'],
  'wan':    ['暹羅灣,sian1.luo2.wan1','綺襦紈褲,ci3.ru2.wan2.ku4','浣溪沙,wan3.si1.sha1','鐵腕,tie3.wan4','*'],
  'wun':    ['溫馨,wun1.sin1','名聞遐邇,ming2.wun2.sia2.er3','礪吻磨距,li4.wun3.mo2.jyu4','打破砂鍋璺到底,da3.po4.sha1.guo1.wun4.dao4.di3','*'],
  'wang':   ['尪仔標,wang1.z3.biao1','虢滅虞亡,guo2.mie4.yu2.wang2','網路,wang3.lu4','蓍簪不忘,sh1.zan1.bu2.wang4','*'],
  'wong':   ['漁翁得利,yu2.wong1.de2.li4','*','橚矗蓊茸,su4.chu4.wong3.rong3','酒甕,jiou3.wong4','*'],
  'yu':     ['淤泥,yu1.ni2','涸澤而漁,he2.ze2.er2.yu2','褒貶與奪,bao1.bian3.yu3.duo2','典麗矞皇,dian3.li4.yu4.huang2','*'],
  'yue':    ['雞黍之約,ji1.shu3.jh1.yue1','*','*','風月寶鑑,fong1.yue4.bao3.jian4','*'],
  'yuan':   ['冤枉,yuan1.wang3','國家元首,guo2.jia1.yuan2.shou3','離山窵遠,li2.shan1.diao4.yuan3','鹿苑長春,lu4.yuan4.chang2.chun1','*'],
  'yun':    ['氤氳靉靆,yin1.yun1.ai4.dai4','松筠之操,song1.yun2.jh1.cao1','隕石,yun3.sh2','毓子孕孫,yu4.z3.yun4.sun1','*'],
  'yong':   ['樗櫟庸材,shu1.li4.yong1.cai2','水濁則喁,shuei3.jhuo2.ze2.yu2.yong2','勇敢,yong3.gan3','僱佣,gu4.yong4','*'],
}
const exampleOf = (tyong, toneNo) => {
  let ret = 'Spell error.'
  let exArr = dict[tyong]
  if( exArr !== undefined )
  {
    let ex = exArr[toneNo - 1]
    ret = 'Tone error.'
    console.log('463: ', ex)
    if( ex !== undefined )
    {
      switch (ex) {
        case '*':
          ret = 'Change the tone.'
          break
        case '-':
          ret = 'No proper word.'
          break
        default:
          let word = ex.split(',')[0]
          let pyinArr = ex.split(',')[1].split('.')
          ret = Kanjis(word, pyinArr)
          break;
      }
    }
  }
  return ret
}
let retAns  = {bpm:'', tyong:'', tone:'', no:0, msg:''}
let clockId = null, wIdx = 0, tIdx = 1
let stopPlay = ui=>{
  clearInterval(clockId)
  clockId = null
  wIdx = 0
  tIdx = 1  
}
let autoPlay = ui=>{
  let key = Object.keys(dict)[wIdx]
  let tmpTY = (key)? key + tIdx : ''
  retAns = CheckSpell(tmpTY)
  if(retAns) {
    tIdx++
    if( tIdx===6 ) {
        tIdx = 1
        wIdx ++
    }
  } else {
    stopPlay()
  }
  ui(tmpTY)
}
function BasicPage(props) {
  let [TYong, setTYong] = useState('')
  let [kCode, setkCode] = useState('')
  let emitKey = keyCode=>{
      let {no} = retAns, tmpTY = TYong
      if(keyCode=== 8) {        // Backspace
        if(no===0) { tmpTY = tmpTY.slice(0, tmpTY.length-1) }
      }
      else if(keyCode===27) {   // ESC
        tmpTY = ''
      } else if(keyCode===32) { // Space bar
        tmpTY += '1'
      } else if (49<=keyCode && keyCode<=53) { // number: 1~5
        tmpTY += String.fromCharCode(keyCode)        
      } else { // Ending with 1~5 will stop inputing any characters
        tmpTY += (no!==0? no:String.fromCharCode(keyCode).toLowerCase())
      }
      retAns = CheckSpell(tmpTY)
      setTimeout(()=>{ setkCode(''); }, 800)
      setTYong(retAns.tyong)
      setkCode(keyCode)
  }
  useEffect(()=>{ window.onkeydown = e=>{ emitKey(e.keyCode) } })
  let {tyong, no, bpm, tone, msg} = retAns
  let toneNo = (no===0)? '': no.toString()
  if( msg==='Bingo!' ) {
      msg = exampleOf(tyong, no)
  }
  let tmpButtons = Tong_Yong_Keys.map((btn,i)=>{
    const w = 640, h = 460
    let width = btn.w + 'px'
    let height= btn.h + 'px'
    let left  = w/2 + (btn.x - btn.w/2) + 'px'
    let top   = h/2 + (btn.y - btn.h/2) + 'px'
    let borderRadius = btn.r + '%'
    
    let css = 'btn-pyin-'
    if(btn.code===kCode) {
      css += (btn.en)? 'clicked':'useless'
    } else {
      css += (btn.en)? 'normal':'disable'
    }
    let tmpFunc = e=>{ emitKey(btn.code) }
    if(btn.sym==='PLAY') {tmpFunc= e=>{clockId=setInterval(autoPlay,800,t=>setTYong(t))}}
    if(btn.sym==='STOP') {tmpFunc=e=>{stopPlay()}}
    return  <div  key={i} className={css} 
                  style={{width, height, left, top, borderRadius}}
                  onClick={tmpFunc} >
              {btn.sym}
            </div>
  })
  return (
    <div id='page-bopomo'>
        <h2>Tong Yong Input Method</h2>
        <div id='pyin-screen'>
          <div>
            <div id='pyin-bpm'>{bpm}{tone}</div>
            <div id='pyin-tyong'>{tyong}{toneNo}</div>
          </div>
          <div>
            {msg}
          </div>
        </div>
        <div id='pyin-keyboard'>
            {tmpButtons}
        </div>
    </div>
  )
}
export default BasicPage
