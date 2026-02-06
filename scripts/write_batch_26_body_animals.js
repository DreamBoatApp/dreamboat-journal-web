const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../content/tr/meanings');

const symbols = [
    // BODY PARTS (15 Items)
    {
        slug: 'ear',
        data: {
            localizedName: "Kulak",
            title: "Rüyada Kulak Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada kulak görmek, içsel sesi dinlemeyi, duyulması gereken mesajları ve itaati simgeler.",
            introduction: "Bedenin en hassas alıcılarından biri olan Kulak, rüyalarda 'duyma' eyleminin ötesine geçer. O, dış dünyadan gelen seslerin yanı sıra, iç sesin, vicdanın ve sezgilerin fısıltılarını yakalayan ruhsal bir anten gibidir.",
            symbolism: "Spiral yapısıyla kulak, bilgeliğin ve gizli bilginin labirentini andırır. Rüyada kulak, dikkat kesilmeniz gereken bir hakikati veya ihmal ettiğiniz bir uyarıyı simgeler. Kulağın tıkanması, gerçeklere karşı direnci; büyük kulak, dedikoduyu veya aşırı hassasiyeti temsil eder.",
            cosmicAnalysis: "Satürn yönetimindeki kulak, itaat ve öğrenme ile ilişkilidir. Dolunay'da görülen kulak rüyası, size söylenen bir sözün veya sırrın aydınlanacağı anlamına gelir.",
            commonScenarios: [
                "Kulağına fısıldanması: Bilinçdışından veya rehber ruhlardan gelen gizli bir mesajı ifade eder.",
                "Kulak temizlemek: Yanlış anlamalardan ve önyargılardan arınarak gerçeği duyma isteğini gösterir.",
                "Kulak ağrısı: Duymak istemediğiniz, sizi rahatsız eden sözleri veya eleştirileri simgeler."
            ],
            cta: "Ruhunuz size ne fısıldıyor? Dream Boat ile iç sesinizi daha net duyun."
        }
    },
    {
        slug: 'nose',
        data: {
            localizedName: "Burun",
            title: "Rüyada Burun Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada burun görmek, sezgileri, önseziyi ve karakter duruşunu simgeler.",
            introduction: "Yüzün merkezinde yer alan Burun, sadece nefes (hayat) kaynağı değil, aynı zamanda 'koku alma' yetisiyle en ilkel ve güçlü sezgilerin merkezidir. Rüyada burun, bir durumu 'sezme' ve tehlikeyi veya fırsatı önceden koklama yeteneğinizi temsil eder.",
            symbolism: "Burun, kişisel onur ve merakla ilgilidir. 'Burnunu sokmak' deyimindeki gibi, sınırları aşmayı veya araştırmayı simgeleyebilir. Kanaması, yaşam enerjisinin kaybını veya kırılan gururu; tıkanması ise sezgilerin bloke olduğunu ve nefes alamadığınızı (bunalmayı) gösterir.",
            cosmicAnalysis: "Mars etkisindeki burun, agresif bir dürtüyü veya hayatta kalma içgüdüsünü yansıtır. Yeni Ay'da, yeni bir kokunun (yeni bir durumun) hayatınıza girdiğini müjdeler.",
            commonScenarios: [
                "Burnunun büyümesi: Pinokyo arketipi gibi, yalanı, abartıyı veya artan egoyu simgeler.",
                "Güzel koku almak: Manevi bir ferahlamayı ve iyi haberlerin yaklaştığını gösterir.",
                "Burun estetiği: Dış dünyaya sunduğunuz imajı değiştirme ve kendinizi yeniden tanımlama arzusudur."
            ],
            cta: "Burnunuza ne kokular geliyor? Dream Boat ile sezgilerinizin izini sürün."
        }
    },
    {
        slug: 'mouth',
        data: {
            localizedName: "Ağız",
            title: "Rüyada Ağız Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada ağız görmek, ifadeyi, beslenmeyi ve yaratıcı sözü simgeler.",
            introduction: "Hem beslenmenin hem de ifadenin kapısı olan Ağız, rüyalarda 'içe alma' ve 'dışa vurma' dengesini temsil eder. O, kelimelerin (yaratım) döküldüğü ve yaşamın (besin) girdiği kutsal bir eşiktir.",
            symbolism: "Ağız, iletişim ve tüketim sembolüdür. Kapalı ağız, sır saklamayı veya ifade edilemeyen duyguları; açık ağız, şaşkınlığı, açlığı veya konuşma ihtiyacını gösterir. Ağızdan çıkanlar karakterinizi, girenler ise niyetlerinizi belirler.",
            cosmicAnalysis: "Merkür tarafından yönetilen ağız, iletişimin gücünü vurgular. Büyüyen Ay evresinde, kendinizi ifade etme ve isteklerinizi sesli dile getirme zamanıdır.",
            commonScenarios: [
                "Ağzın kilitlenmesi: Kendinizi savunamadığınızı veya baskı altında hissettiğinizi gösterir.",
                "Ağızdan bir şey çıkması: Bastırılmış bir duygunun veya kötü bir sözün kontrolsüzce dışarı atılmasını simgeler.",
                "Büyük ağız: Otoriteyi, sözü geçen birini veya bazen boşboğazlığı ifade edebilir."
            ],
            cta: "Sözleriniz kaderinizi nasıl şekillendiriyor? Dream Boat uygulamasını indirin ve rüya dilinizi çözün."
        }
    },
    {
        slug: 'tongue',
        data: {
            localizedName: "Dil",
            title: "Rüyada Dil Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada dil görmek, iletişimi, tadı ve sözün gücünü simgeler.",
            introduction: "En güçlü kas ve tat alma organı olan Dil, rüyalarda 'sözün kılıcı'nı ve 'hayatın tadını' temsil eder. O, hem yapıcı hem de yıkıcı olabilen, iletişimdeki ustalığı ve duygusal zekayı yansıtan bir araçtır.",
            symbolism: "Dil, ifade özgürlüğünün ve gerçeğin sembolüdür. Dilini yutmak, korkuyu; dil çıkarmak, isyanı veya alayı simgeler. Dilin şişmesi veya dolanması, kendinizi ifade ederken yaşadığınız güçlükleri veya söylediğiniz bir yalandan duyulan pişmanlığı gösterir.",
            cosmicAnalysis: "Merkür'ün en saf hali olan dil, iletişimdeki akıcılığı yönetir. Dolunay'da dil görmek, uzun süredir tutulan bir itirafın döküleceğine işarettir.",
            commonScenarios: [
                "Dilin kopması/kesilmesi: İletişiminizin tamamen kesildiğini veya susmak zorunda kaldığınızı simgeler.",
                "Çatal dil: İkiyüzlülüğü, yalanı veya manipülatif bir durumu işaret eder.",
                "Acı tat almak: Söylediğiniz veya duyduğunuz sözlerin yarattığı hayal kırıklığını temsil eder."
            ],
            cta: "Dilinizde hangi sözler düğümlendi? Dream Boat ile kendinizi ifade etmenin yollarını bulun."
        }
    },
    {
        slug: 'lips',
        data: {
            localizedName: "Dudak",
            title: "Rüyada Dudak Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada dudak görmek, cinselliği, çekiciliği ve yakınlığı simgeler.",
            introduction: "Duyusallığın ve erotizmin sınır çizgisi olan Dudaklar, rüyalarda 'öpmeye' ve 'söylemeye' hazır olmayı simgeler. Onlar, iç dünyanızın dış dünyaya açılan en davetkar kapısıdır.",
            symbolism: "Dudaklar, Venüs enerjisi taşır; aşkı, tutkuyu ve estetiği temsil eder. Kırmızı dudaklar canlılığı ve cinsel arzuyu; çatlamış dudaklar ise duygusal kuraklığı ve sevgisizliği gösterir. Büzülmüş dudaklar, onayı reddetmeyi veya memnuniyetsizliği ifade eder.",
            cosmicAnalysis: "Venüs etkisindeki dudaklar, romantik ilişkilerdeki durumu yansıtır. Büyüyen Ay'da görülen dolgun dudaklar, artan çekiciliği ve aşk potansiyelini müjdeler.",
            commonScenarios: [
                "Dudak boyamak (Ruj): Kendinizi daha çekici kılma ve dikkat çekme isteğinizi, bazen de bir maske takmayı simgeler.",
                "Dudaktan öpmek: Birleşmeyi, anlaşmayı ve ruhsal/bedensel bütünleşmeyi temsil eder.",
                "Dudağın kanaması: Aşkta veya sözlerinizde yaşadığınız bir incinmeyi, kırgınlığı gösterir."
            ],
            cta: "Dudaklarınızdan dökülemeyen sırlar neler? Dream Boat ile rüyalarınızdaki aşk mesajlarını okuyun."
        }
    },
    {
        slug: 'neck',
        data: {
            localizedName: "Boyun",
            title: "Rüyada Boyun Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada boyun görmek, zihin ve beden arasındaki bağı, iradeyi ve esnekliği simgeler.",
            introduction: "Başı (zihin) gövdeye (beden) bağlayan köprü olan Boyun, rüyalarda 'irade' ve 'esneklik' merkezidir. Hayatın olaylarına nereden baktığımızı belirleyen, başımızı çevirmemizi sağlayan bu hassas bölge, duruşumuzu temsil eder.",
            symbolism: "Boyun, gurur ve inattır. 'Boyun eğmek' deyimi teslimiyeti; 'dik durmak' ise onuru simgeler. Boyun ağrısı veya tutulması, hayata bakış açınızı değiştirmekte zorlandığınızı, inatçı bir tutum sergilediğinizi gösterir. Boğaz bölgesi aynı zamanda ifade (çakra) merkezidir.",
            cosmicAnalysis: "Boğa burcu ve Venüs yönetimindeki boyun, maddi güven ve inatçılıkla ilgilidir. Sabit fikirleri ve direnci temsil edebilir. Küçülen Ay'da, katı tutumlarınızı yumuşatma zamanıdır.",
            commonScenarios: [
                "Boyna sarılmak: Destek arayışını, sevgiyi ve birine yük olma/yükünü alma dengesini simgeler.",
                "Boynu bükük olmak: Çaresizliği, üzüntüyü veya teslimiyeti ifade eder.",
                "Boyun kırmak: Hayati bir tehlikeyi veya çok riskli bir kararın eşiğinde olduğunuzu gösterir."
            ],
            cta: "Nereye bakmaktan kaçınıyorsunuz? Dream Boat uygulamasını indirin ve bakış açınızı genişletin."
        }
    },
    {
        slug: 'shoulder',
        data: {
            localizedName: "Omuz",
            title: "Rüyada Omuz Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada omuz görmek, sorumlulukları, yükleri ve desteği simgeler.",
            introduction: "Hayatın yükünü taşıyan Omuzlar, rüyalarda 'sorumluluk kapasitemizi' ve 'gücümüzü' simgeler. Atlas'ın dünyayı omuzlarında taşıması gibi, biz de hayatın ağırlığını ve görevlerimizi burada hissederiz.",
            symbolism: "Geniş omuzlar gücü ve koruyuculuğu; düşük omuzlar ise yorgunluğu ve pes etmeyi anlatır. Omuz omuza vermek, dayanışmayı; birine omuz atmak, rekabeti veya saldırganlığı gösterir. Sol omuz genellikle duygusal yükleri, sağ omuz ise maddi/iş yüklerini temsil eder.",
            cosmicAnalysis: "Satürn etkisi altındaki omuzlar, görev bilincini yönetir. Dolunay evresinde omuz ağrısı, artık taşıyamayacağınız bir yükü bırakmanız gerektiğine dair bedensel bir uyarıdır.",
            commonScenarios: [
                "Omuzda yük taşımak: Ailenin veya işin sorumluluğunu tek başına üstlendiğinizi gösterir.",
                "Omuza dokunulması: Birinden gelecek desteği, onayı veya “yalnız değilsin” mesajını simgeler.",
                "Omuzların açık olması: Kendine güveni, rahatlığı ve bazen de savunmasızlığı ifade edebilir."
            ],
            cta: "Omuzlarınızdaki yükler size mi ait? Dream Boat ile sorumluluklarınızı ve sınırlarınızı gözden geçirin."
        }
    },
    {
        slug: 'arm',
        data: {
            localizedName: "Kol",
            title: "Rüyada Kol Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada kol görmek, eyleme geçme gücünü, uzanmayı ve korumayı simgeler.",
            introduction: "Dünyaya uzanan ve onu kavrayan Kollarımız, rüyalarda 'eylem kapasitemizi' ve 'yetişme gücümüzü' temsil eder. İstediklerimize ne kadar ulaşabildiğimiz veya sevdiklerimizi ne kadar koruyabildiğimiz, kolların durumuyla anlatılır.",
            symbolism: "Sağ kol genellikle aktif, verici ve eril (iş) enerjiyi; sol kol ise pasif, alıcı ve dişil (duygu) enerjiyi simgeler. Kolun kırılması, eylemsizliği ve güç kaybını; güçlü kollar ise muktedir olmayı ve başarıyı ifade eder. Kucak açmak, kabullenmektir.",
            cosmicAnalysis: "Mars ve Merkür (eller) bağlantılıdır. İkizler burcu kollarla ilişkilidir; bu da iletişimi ve bağlantıyı vurgular. Büyüyen Ay'da, hedeflerinize uzanma ve onları yakalama gücünüz artar.",
            commonScenarios: [
                "Kolun kesilmesi: Bir yakının kaybını veya iş yapma yeteneğinizin elinizden alınmasını simgeler.",
                "Kıllı kollar: Maddi gücü, zenginliği ve erkeksi bir koruma enerjisini gösterir.",
                "Kol kola girmek: Ortaklığı, dostluğu ve yaşam yolunda bir yoldaş bulmayı temsil eder."
            ],
            cta: "Hayatta neye uzanmaya çalışıyorsunuz? Dream Boat ile hedeflerinize giden yolu çizin."
        }
    },
    {
        slug: 'elbow',
        data: {
            localizedName: "Dirsek",
            title: "Rüyada Dirsek Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada dirsek görmek, esnekliği, sınır çizmeyi ve kişisel alanı simgeler.",
            introduction: "Kolun bükülme noktası olan Dirsek, rüyalarda 'hareket alanı' ve 'kendine yer açma' mücadelesini simgeler. O, hem bir esneklik noktasıdır hem de kalabalıkta yolumuzu açmak için kullandığımız sert bir araçtır.",
            symbolism: "Dirsek çürütmek, emeği ve çalışmayı; dirsek göstermek, rekabeti ve sınır koymayı anlatır. Rüyada dirseğinizin sertleştiğini veya büyüdüğünü görmek, hayatta daha agresif bir tutum takınarak kendinize yer açma ihtiyacınızı gösterebilir. Yaralı dirsek, hareket kabiliyetinizin kısıtlandığını hissettirir.",
            cosmicAnalysis: "Mars enerjisi taşıyabilir (dürtmek/yer açmak). Küçülen Ay evresinde, insanları kendinizden uzaklaştırma veya sınırlarınızı yeniden çizme dönemidir.",
            commonScenarios: [
                "Dirsek atmak: Rekabetçi ortamda öne geçme çabasını veya birini hayatınızdan itmeyi simgeler.",
                "Dirseğin kirlenmesi: Çalışma hayatında yaşanacak zorluklara veya lekelenmelere işaret edebilir.",
                "Dirseğini çarpmak: Beklenmedik bir engelle karşılaşmayı ve ani bir sarsıntıyı (şok) gösterir."
            ],
            cta: "Kendinize yeterince alan açabiliyor musunuz? Dream Boat uygulamasını indirin ve sınırlarınızı belirleyin."
        }
    },
    {
        slug: 'wrist',
        data: {
            localizedName: "Bilek",
            title: "Rüyada Bilek Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada bilek görmek, eylemlerin kontrolünü, hassasiyeti ve zamanlamayı simgeler.",
            introduction: "Elin hareket kabiliyetini sağlayan Bilek, rüyalarda 'esnek kontrol' ve 'hayati nabız' noktasıdır. Gücün zarifçe yönlendirildiği bu nokta, hayattaki ince ayarları nasıl yaptığımızı gösterir.",
            symbolism: "Bilek, nabzın attığı yerdir; bu nedenle yaşam enerjisini ve hayatiyeti simgeler. Kelepçeli bilekler, çaresizliği ve engellenmeyi; bilezik takmak, bir bağlılığı veya ödülü temsil eder. Bilek kesmek (mecazi), enerjiyi boşa harcamayı veya kendi gücünü sabote etmeyi anlatır.",
            cosmicAnalysis: "Merkür (eller) ile bağlantılıdır. Hareketliliği ve beceriyi yönetir. Yeni Ay'da bilek, eyleme geçmeden önceki hazırlık ve esneklik aşamasını simgeler.",
            commonScenarios: [
                "Bileğini tutmak: Birini durdurma isteğini veya kendi nabzını (durumunu) kontrol etme ihtiyacını gösterir.",
                "İnce bilek: Zarafeti ama aynı zamanda kırılganlığı ve fiziksel zayıflığı işaret edebilir.",
                "Bilek güreşi: İrade çatışmasını, rekabeti ve gücünü kanıtlama çabasını simgeler."
            ],
            cta: "Gücünüzü nereye kanalize ediyorsunuz? Dream Boat ile enerjinizin akış yönünü keşfedin."
        }
    },
    {
        slug: 'finger',
        data: {
            localizedName: "Parmak",
            title: "Rüyada Parmak Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada parmak görmek, detayları, yön göstermeyi ve yaratıcılığı simgeler.",
            introduction: "Dokunmanın ve yaratmanın uç noktaları olan Parmaklar, rüyalarda 'detaylardaki ustalığı' ve 'işaret edilen yönü' temsil eder. Her parmak farklı bir gezegenle ve anlamla ilişkilidir, hayatın farklı alanlarına dokunur.",
            symbolism: "İşaret parmağı (Jüpiter) otorite ve yönü; orta parmak (Satürn) sorumluluğu ve dengeyi; yüzük parmağı (Güneş) duygusallığı ve bağı; serçe parmak (Merkür) iletişimi ve ticareti simgeler. Parmakla göstermek suçlamayı; parmak şıklatmak uyanışı veya dikkati anlatır.",
            cosmicAnalysis: "Merkür, elleri ve parmakları yönetir. Büyüyen Ay evresinde parmaklar, yeteneklerin geliştiğini ve el becerilerinin (yaratıcılığın) arttığını gösterir.",
            commonScenarios: [
                "Parmak kesilmesi: O parmağın temsil ettiği alanda (örneğin yüzük parmağı ise evlilikte) bir kayıp veya kopuş yaşamayı simgeler.",
                "Fazla parmak: Olağanüstü bir yeteneği, bereketi veya bazen de kafa karışıklığını ifade eder.",
                "Parmak izi: Kişisel kimliğinizi, benzersizliğinizi ve hayatta bıraktığınız izi sorgulamanızı sağlar."
            ],
            cta: "Hayatınızda neyi işaret ediyorsunuz? Dream Boat uygulamasını indirin ve parmaklarınızın ucundaki kaderi görün."
        }
    },
    {
        slug: 'thumb',
        data: {
            localizedName: "Başparmak",
            title: "Rüyada Başparmak Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada başparmak görmek, irade gücünü, onayı ve kontrolü simgeler.",
            introduction: "Elin en güçlü ve bağımsız üyesi olan Başparmak, rüyalarda 'İrade' ve 'Ego'nun sembolüdür. Diğer parmakların karşısında durabilen tek parmak olarak, insanın kendi hayatını kavrama ve yönlendirme gücünü temsil eder.",
            symbolism: "Başparmak (Mars), yaşama tutunma gücüdür. Başparmağı yukarı kaldırmak onayı ve başarıyı; aşağı indirmek reddi ve yenilgiyi simgeler. Başparmak emmek, gerilemeyi (regresyon) ve güvensizlik anında çocuksu bir teselli arayışını gösterir.",
            cosmicAnalysis: "Mars enerjisi taşır. Aktif irade ve kararlılıktır. Dolunay'da başparmak, aldığınız bir kararın arkasında durmanız gerektiğini veya gücü elinize almanız gerektiğini hatırlatır.",
            commonScenarios: [
                "Başparmağın büyük olması: Güçlü bir iradeye, liderlik vasfına ve olayları kontrol etme yeteneğine işarettir.",
                "Başparmak yaralanması: İradenizin kırıldığını, işlerinizde aksaklıklar ve güç kaybı yaşayabileceğinizi simgeler.",
                "Otostop çekmek (Başparmakla): Hedefinize gitmek için başkalarından yardım alma ihtiyacınızı ve yola çıkma isteğinizi yansıtır."
            ],
            cta: "Hayatınızın kontrolü kimin elinde? Dream Boat ile iradenizi güçlendirmenin yollarını keşfedin."
        }
    },
    {
        slug: 'knee',
        data: {
            localizedName: "Diz",
            title: "Rüyada Diz Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada diz görmek, inancı, esnekliği, desteği ve tevazuyu simgeler.",
            introduction: "Bedenin yükünü taşıyan ve yere çökmemizi sağlayan Dizler, rüyalarda 'gurur' ile 'teslimiyet' arasındaki dengeyi temsil eder. Diz çökmek hem yenilgi hem de ibadet (saygı) olabilir; bu nedenle dizler ruhsal duruşumuzun simgesidir.",
            symbolism: "Dizler (Satürn/Oğlak), yapı ve dayanıklılıktır. Diz çökmek, egoyu alçaltmayı ve bir otoriteye veya kutsala teslim olmayı anlatır. Dizlerin titremesi korkuyu ve güvensizliği; sağlam dizler ise hayatta dik durma gücünü simgeler. Şefkat göstermek için 'dizine yatırmak' anaç bir korumadır.",
            cosmicAnalysis: "Satürn (Oğlak burcu) dizleri yönetir. Karma, sabır ve zamanla gelen saygınlıkla ilgilidir. Küçülen Ay'da, gururunuzu bir kenara bırakıp yardım istemeniz veya özür dilemeniz gerekebilir.",
            commonScenarios: [
                "Diz kapağı yarası: İlerlemenizi engelleyen duygusal veya maddi bir darbeyi; hareket kabiliyetinizin kısıtlanmasını gösterir.",
                "Dizlerinin üzerine düşmek: Beklenmedik bir olay karşısında çaresiz kalmayı veya manevi bir uyanış için egonun kırılmasını simgeler.",
                "Diz dize oturmak: Yakınlığı, samimiyeti ve duygusal teması ifade eder."
            ],
            cta: "Neyin önünde diz çöküyorsunuz? Dream Boat ile ruhsal duruşunuzu analiz edin."
        }
    },
    {
        slug: 'ankle',
        data: {
            localizedName: "Ayak Bileği",
            title: "Rüyada Ayak Bileği Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada ayak bileği görmek, yön değişimini, desteği ve dengede durmayı simgeler.",
            introduction: "Tüm bedeni, küçük bir hareketle yönlendiren Ayak Bileği, rüyalarda 'yön belirleme' ve 'esnek denge' sembolüdür. Hayatta hangi yöne gideceğimize karar verdiğimiz ve adımlarımızı destekleyen hassas noktadır.",
            symbolism: "Ayak bileği (Kova burcu), ani yön değişimlerini ve özgürlüğü temsil eder. Burkulması, yanlış bir yola girdiğinizi veya adım atarken tereddüt ettiğinizi gösterir. İnce veya zarif ayak bileği, estetiği; zincirli ayak bileği ise özgürlüğün kısıtlanmasını ve bir yere (veya duruma) mahkumiyeti anlatır.",
            cosmicAnalysis: "Uranüs ve Kova burcu etkisindedir. Ani değişimler ve bağımsızlıkla ilgilidir. Yeni Ay'da, hayat yolunda yapacağınız manevraları ve rota değişikliklerini simgeler.",
            commonScenarios: [
                "Ayak bileğinin şişmesi: Duygusal birikimin (ödem) ilerlemenizi zorlaştırdığını, adımlarınızı ağırlaştırdığını gösterir.",
                "Bilezik (halhal) takmak: Kendinizi bir yere veya kişiye aidiyetle bağladığınızı, yürüyüşünüzde dikkat çekmek istediğinizi simgeler.",
                "Bileğini burkmak: Aceleci davranarak manevi dengenizi kaybettiğinizi ve durup düşünmeniz gerektiğini işaret eder."
            ],
            cta: "Hangi yöne dönmek istiyorsunuz? Dream Boat uygulamasını indirin ve doğru adımı atın."
        }
    },
    {
        slug: 'brain',
        data: {
            localizedName: "Beyin",
            title: "Rüyada Beyin Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada beyin görmek, zihinsel süreçleri, mantığı, kontrolü ve yaratıcı fikirleri simgeler.",
            introduction: "Düşüncenin ve bilincin tahtı olan Beyin, rüyalarda 'kontrol merkezini' ve 'rasyonel aklı' temsil eder. Karmaşık kıvrımlarıyla, çözülmesi gereken sorunları, fikir üretimini ve zihin ile ruh arasındaki iletişimi simgeler.",
            symbolism: "Beyin, entelektüel kapasite ve analiz gücüdür. Açıkta bir beyin görmek, düşüncelerin savunmasızlığını veya sırların açığa çıkmasını anlatır. Beyin ameliyatı, düşünce yapınızı veya inanç sisteminizi kökten değiştirecek bir süreci (zihinsel formatı) işaret eder. Beyin yemek, bilgiyi içselleştirmek veya başkasının fikirlerinden beslenmektir.",
            cosmicAnalysis: "Merkür (akıl) ve Ay (hafıza) etkileşimidir. Dolunay'da zihinsel aktivitenin zirve yapmasını, aydınlanmayı veya aşırı düşünmekten kaynaklanan uykusuzluğu simgeler.",
            commonScenarios: [
                "Beynin yıkanması: Birilerinin sizi manipüle etmeye çalıştığını veya kendi fikirlerinizi başkalarınınkiyle değiştirdiğinizi gösterir.",
                "Beyin kanaması: Aşırı stres, zihinsel baskı ve duygusal taşmanın rasyonel aklı devre dışı bırakmasını simgeler.",
                "Hayvan beyni: İçgüdüsel zekayı ve kurnazlığı; bazen de temel dürtülerle hareket etmeyi ifade eder."
            ],
            cta: "Zihniniz size oyun mu oynuyor? Dream Boat ile düşüncelerinizin labirentinden çıkın."
        }
    },

    // ANIMALS (15 Items)
    {
        slug: 'squirrel',
        data: {
            localizedName: "Sincap",
            title: "Rüyada Sincap Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada sincap görmek, hazırlığı, biriktirmeyi, çevikliği ve geleceğe yatırım yapmayı simgeler.",
            introduction: "Hızlı hareketleri ve biriktirme telaşıyla Sincap, rüyalarda 'geleceğe hazırlık' ve 'kaynak yönetimi'nin sevimli habercisidir. O, kışın geleceğini bilen ve bugünün bereketini yarına saklayan tedbirli zihniyeti temsil eder.",
            symbolism: "Sincap, çalışkanlık ve tutumluluk sembolüdür. Ceviz/fındık toplamak, bilgi veya maddi kaynak biriktirmektir. Ancak bazen sakladığı yeri unutan sincap, dağınıklığı veya aşırı endişeyi (istifçiliği) simgeleyebilir. Hızlıca tırmanması, hedeflere ulaşmadaki seriliği ve pratik zekayı gösterir.",
            cosmicAnalysis: "Merkür (hız/zeka) ve Satürn (tedbir/zaman) etkisindedir. Sonbahar ekinoksu enerjisi taşır. Küçülen Ay'da, gereksiz harcamaları kısıp birikim yapma zamanıdır.",
            commonScenarios: [
                "Sincap beslemek: Doğayla uyumu, küçük yatırımların büyüyeceğini ve cömertliğin size geri döneceğini simgeler.",
                "Sincabın kaçması: Elinizdeki bir fırsatın veya paranın hızla yok olabileceğine dair bir uyarıdır.",
                "Eve giren sincap: Beklenmedik ama sevimli bir misafiri veya ev ekonomisine dair bir haberi işaret eder."
            ],
            cta: "Kışa hazır mısınız? Dream Boat uygulamasını indirin ve kaynaklarınızı doğru yönetin."
        }
    },
    {
        slug: 'deer',
        data: {
            localizedName: "Geyik",
            title: "Rüyada Geyik Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada geyik görmek, zarafeti, sezgisel rehberliği ve ruhsal uyanışı simgeler.",
            introduction: "Ormanın zarif ve ürkek ruhu Geyik (özellikle Ceylan), rüyalarda 'masumiyet', 'zarafet' ve 'sezgisel uyanış'ın sembolüdür. O, ruhun vahşi doğasındaki en hassas, en narin yönü temsil eder ve genellikle ruhsal bir rehber olarak belirir.",
            symbolism: "Geyik, Artemis'in kutsal hayvanıdır; doğayla bağlantıyı ve dişil sezgileri simgeler. Erkek geyik (boynuzlu), asaleti, koruyuculuğu ve yeniden doğuşu (boynuzlarını atıp yenilemesiyle) anlatır. Geyik avlamak, kendi masumiyetini öldürmek veya hırslarına yenik düşmektir.",
            cosmicAnalysis: "Ay ve Venüs enerjisi taşır. Ruhsal hassasiyeti yönetir. Yeni Ay'da görülen geyik, yeni bir ruhsal yolun veya aşkın habercisidir.",
            commonScenarios: [
                "Geyik sürüsü: Sosyal uyumu, barışçıl bir topluluğu ve ailenin koruyucu gücünü gösterir.",
                "Yaralı geyik: İncinmiş duyguları, kırılan gururu ve şefkat ihtiyacını simgeler.",
                "Geyik boynuzu: Gücü, statüyü ve psişik antenleri (evrensel mesajları almayı) temsil eder."
            ],
            cta: "Ruhunuzun rehberi hangi yolu gösteriyor? Dream Boat ile sezgilerinizi takip edin."
        }
    },
    {
        slug: 'camel',
        data: {
            localizedName: "Deve",
            title: "Rüyada Deve Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada deve görmek, dayanıklılığı, sabrı, uzun yolculukları ve yük taşımayı simgeler.",
            introduction: "Çölün zorlu şartlarına meydan okuyan Deve, rüyalarda 'sonsuz sabır' ve 'dayanıklılık' simgesidir. O, hayatın kurak (zor) dönemlerinde hayatta kalma kapasitemizi ve uzun vadeli hedeflerimize ulaşmak için taşıdığımız yükleri anlatır.",
            symbolism: "Deve, rezervlerini (hörgüç) kullanarak ilerler; bu da içsel kaynaklarınızı verimli kullanmayı simgeler. Deve kervanı, toplu bir kader yolculuğunu veya bereketi gösterir. Devenin inat etmesi, değişime direnç göstermeyi; deveye binmek ise zorlukların üstesinden gelip kaderi yönetmeyi ifade eder.",
            cosmicAnalysis: "Satürn (zaman/sabır) ve Jüpiter (uzun yol) etkisindedir. Dolunay'da görülen deve, uzun süren bir çilenin veya projenin nihayet hedefe yaklaştığını müjdeler.",
            commonScenarios: [
                "Deveye binmek: Hayatınızın kontrolünü elinize aldığınızı ve uzun bir başarı yolculuğuna çıktığınızı gösterir.",
                "Deve sürüsü/kervanı: Zenginliği, ticari başarıyı veya kalabalık bir misafir grubunu simgeler.",
                "Devenin ısırması/tükürmesi: Bastırılmış öfkenin veya size yük yükleyen birinin (belki patronun) tepkisini işaret eder."
            ],
            cta: "Hangi çölleri aşıyorsunuz? Dream Boat uygulamasını indirin ve içsel dayanıklılığınızı keşfedin."
        }
    },
    {
        slug: 'giraffe',
        data: {
            localizedName: "Zürafa",
            title: "Rüyada Zürafa Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada zürafa görmek, olaylara geniş bir açıdan bakmayı, öngörüyü ve farkındalığı simgeler.",
            introduction: "Uzun boynuyla ufku tarayan Zürafa, rüyalarda 'büyük resmi görme' ve 'yüksek farkındalık' sembolüdür. O, detaylarda boğulmak yerine, olaylara yukarıdan bakarak geleceği ve gerçeği sezme yeteneğini temsil eder.",
            symbolism: "Zürafa, kalbi ile kafası arasındaki mesafeye rağmen bağlantıyı koparmayan bir hayvandır; bu da duygu ve mantık dengesini (uzak olsa bile) korumayı anlatır. Yüksekteki dallara ulaşması, başkalarının erişemediği bilgiye veya kaynağa erişimi simgeler. Zürafa ayrıca sosyal statü ve 'başkalarından yukarıda olma' (gurur veya vizyon) anlamına gelebilir.",
            cosmicAnalysis: "Jüpiter (büyüme/genişleme) ve Uranüs (yüksek akıl/farklılık) etkisindedir. Büyüyen Ay'da, vizyonunuzun genişlediğini ve kariyerde yükselişi işaret eder.",
            commonScenarios: [
                "Zürafa sevmek: Yüksek ideallerle barışık olmayı ve vizyoner bir kişiliği kabullenmeyi gösterir.",
                "Koşan zürafa: Gerçeği veya bir haberi herkesten önce görmeyi, hızlı bir ilerlemeyi simgeler.",
                "Yavru zürafa: Yeni gelişen bir yeteneği veya büyümekte olan bir projeyi, korunmaya muhtaç bir fikri temsil eder."
            ],
            cta: "Ufukta neler görüyorsunuz? Dream Boat ile geleceği bugünden okuyun."
        }
    },
    {
        slug: 'zebra',
        data: {
            localizedName: "Zebra",
            title: "Rüyada Zebra Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada zebra görmek, zıtlıkların dengesini, bireyselliği ve kararsızlığı simgeler.",
            introduction: "Siyah ve beyaz çizgilerin dans ettiği Zebra, rüyalarda 'ikiliklerin (dualite) uyumunu' temsil eder. İyi ve kötü, gece ve gündüz, doğru ve yanlış gibi zıt kavramların iç içe geçtiği, hayatın gri alanlarını değil, net zıtlıklarını vurgulayan bir semboldür.",
            symbolism: "Zebra, sürü içinde kaybolmadan özgün (her zebranın çizgisi farklıdır) kalabilmeyi anlatır. Rüyada zebra, hayatınızdaki dengesizliği veya bir kararsızlığı (siyah mı beyaz mı?) yansıtabilir. Evcilleştirilemeyen doğası, özgürlük arzusunu ve kalıplara girmemeyi simgeler.",
            cosmicAnalysis: "Merkür ve Uranüs etkisindedir. İkizler burcu arketipi (ikilik) taşır. Dolunay döneminde, hayatınızdaki zıt kutupların (iş/ev, mantık/duygu) bir çatışma değil, bir bütün oluşturduğunu fark etme zamanıdır.",
            commonScenarios: [
                "Zebra sürüsü: Topluluk içinde hem uyumlu olup hem de bireysel farklılığınızı koruma çabanızı gösterir.",
                "Zebra tarafından kovalanmak: Hayatınızdaki bir çelişkinin veya karar veremediğiniz bir durumun sizi sıkıştırdığını simgeler.",
                "Zebra binmek: Zıtlıkları kontrol altına almayı ve kaotik bir durumu ustalıkla yönetmeyi ifade eder."
            ],
            cta: "Hayatınızın siyah ve beyazlarını nasıl dengeliyorsunuz? Dream Boat uygulamasını indirin ve içsel uyumu yakalayın."
        }
    },
    {
        slug: 'penguin',
        data: {
            localizedName: "Penguen",
            title: "Rüyada Penguen Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada penguen görmek, adaptasyonu, sosyal bağları, fedakarlığı ve soğukkanlılığı simgeler.",
            introduction: "Buzulların ortasındaki smokinli beyefendi Penguen, rüyalarda 'zor koşullara uyum sağlama' ve 'zarafeti koruma' sembolüdür. Karada hantal ama suda usta olan bu canlı, potansiyelinizi doğru ortamda kullanmanız gerektiğini hatırlatır.",
            symbolism: "Penguen, topluluk bilinci ve fedakarlık (yumurtayı koruma) sembolüdür. Soğuğa dayanması, duygusal soğukluklarla başa çıkma gücünü veya zor zamanlarda ayakta kalmayı anlatır. Smokin benzeri renkleri, ciddiyeti ve sosyal normlara uymayı da simgeleyebilir.",
            cosmicAnalysis: "Satürn (soğuk/dayanıklılık) ve Ay (su/duygu) etkisindedir. Kış mevsimi rüyasıdır. Küçülen Ay'da, içe dönme ve enerjinizi koruma (bir araya gelme) zamanıdır.",
            commonScenarios: [
                "Yürüyen penguenler: Hedefe doğru yavaş ama kararlı adımlarla ilerlemeyi; ekip çalışmasını simgeler.",
                "Suya dalan penguen: Bilinçdışının derinliklerine (duygulara) korkusuzca dalmayı ve orada ustalaşmayı gösterir.",
                "Yavru penguen: Korunması gereken hassas bir fikri veya projeyi; ebeveynlik içgüdülerini temsil eder."
            ],
            cta: "Doğru ortamda mısınız? Dream Boat ile yeteneklerinizin akacağı nehri bulun."
        }
    },
    {
        slug: 'pigeon',
        data: {
            localizedName: "Güvercin",
            title: "Rüyada Güvercin Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada güvercin görmek, haberi, barışı, sadakati ve ev beklentisini simgeler.",
            introduction: "Şehir meydanlarının ve çatıların sakini Güvercin, rüyalarda 'beklenen haberin' ve 'barışçıl çözümlerin' elçisidir. Eve dönüş içgüdüsüyle, sadakati, aidiyeti ve köklere bağlılığı temsil eder.",
            symbolism: "Beyaz güvercin evrensel şans, neşe ve Kutsal Ruh (ilahi mesaj) sembolüdür. Gri güvercin, günlük haberleri veya melankoliyi anlatabilir. Güvercin çifti, aşkı ve uyumlu ortaklığı simgeler. Pisliği bile (halk inanışında) maddi kısmet sayılır.",
            cosmicAnalysis: "Venüs (aşk/barış) ve Merkür (haber) etkisindedir. Yeni Ay'da pencereye konan güvercin, hayatınızı değiştirecek temiz bir haberi müjdeler.",
            commonScenarios: [
                "Güvercin uçurmak: Bir dileği evrene bırakmayı, özgürleşmeyi veya bir sıkıntıdan kurtulmayı simgeler.",
                "Güvercin beslemek: Hayır işlemeyi, iyi niyetlerinizi büyütmeyi ve karşılıksız sevgiyi gösterir.",
                "Ölü güvercin: Alınacak kötü bir haberi, hayal kırıklığını veya barış ortamının bozulmasını işaret eder."
            ],
            cta: "Hangi haberi bekliyorsunuz? Dream Boat uygulamasını indirin ve mesajınızı alın."
        }
    },
    {
        slug: 'seagull',
        data: {
            localizedName: "Martı",
            title: "Rüyada Martı Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada martı görmek, özgürlüğü, fırsatçılığı, deniz yolculuğunu ve haberciyi simgeler.",
            introduction: "Denizin ve rüzgarın çığlık atan yoldaşı Martı, rüyalarda 'sınır tanımazlığı' ve 'fırsatları değerlendirmeyi' simgeler. Hem karada hem suda hem de havada yaşayabilmesi, adaptasyonu ve hayatta kalma becerisini anlatır.",
            symbolism: "Martı, bilinçdışının (deniz) ve bilincin (kara/gökyüzü) sınırında yaşar; bu nedenle ruhsal mesajlar getirebilir. Ancak aynı zamanda açgözlülük, gürültücülük ve başkasının kaynağına konma (simit kapma) gibi gölge yönleri de temsil eder. Özgürce süzülmesi, ruhsal hafiflemeyi gösterir.",
            cosmicAnalysis: "Merkür (hareket/ses) ve Ay (deniz) etkisindedir. Dolunay'da martı çığlığı, bastırılmış duyguların haykırışını veya dikkat etmeniz gereken bir uyarıyı simgeler.",
            commonScenarios: [
                "Martı saldırısı: Düşüncelerinizin sizi rahatsız ettiğini veya birinin kaynaklarınıza göz diktiğini gösterir.",
                "Martı beslemek: Zor zamanlarda birine destek olmayı veya kendi ruhunuzu küçük sevinçlerle beslemeyi anlatır.",
                "Ölü martı: Özgürlüğün kısıtlanmasını veya denizle (duygularla) bağın kopmasını simgeler."
            ],
            cta: "Rüzgar sizi nereye sürüklüyor? Dream Boat ile rotanızı belirleyin."
        }
    },
    {
        slug: 'stork',
        data: {
            localizedName: "Leylek",
            title: "Rüyada Leylek Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada leylek görmek, seyahati, değişimi, aileyi ve yeni başlangıçları simgeler.",
            introduction: "Göçmenlerin en asili Leylek, rüyalarda 'büyük değişimin' ve 'seyahatin' habercisidir. 'Leyleği havada görmek' deyimi gibi, bu rüya statikonun bozulacağını, yeni bir yere veya duruma göç edileceğini müjdeler.",
            symbolism: "Leylek, bebek getiren kuş mitinden dolayı 'doğum', 'yenilik' ve 'aile kurma' sembolüdür. Yuvasına sadıktır, bu da evini seven ama gezmeyi de ihmal etmeyen bir ruhu anlatır. Tıkırtılı sesi, iletişimi; uzun bacakları, bataklıktan (duygusal karmaşadan) etkilenmeden yükselebilmeyi simgeler.",
            cosmicAnalysis: "Jüpiter (uzun yol/şans) ve Ay (doğum/aile) etkisindedir. İlkbahar ekinoksu enerjisi taşır. Büyüyen Ay'da, taşınma, hamilelik veya uzun bir yolculuk planını işaret eder.",
            commonScenarios: [
                "Leylek yuvası: Aile saadetini, güvenli bir evi ve kök salmayı simgeler.",
                "Uçan leylek sürüsü: Toplumsal bir değişimi, göçü veya kolektif bir hareketi gösterir.",
                "Leyleğin eve konması: Haneye gelecek büyük bir kısmeti, misafiri veya bebeği müjdeler."
            ],
            cta: "Hayat sizi hangi diyarlara çağırıyor? Dream Boat uygulamasını indirin ve yolculuğa hazırlanın."
        }
    },
    {
        slug: 'crab',
        data: {
            localizedName: "Yengeç",
            title: "Rüyada Yengeç Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada yengeç görmek, savunma mekanizmalarını, duygusal kabuğu ve dolaylı ilerlemeyi simgeler.",
            introduction: "Sert kabuğuyla yumuşak içini koruyan Yengeç, rüyalarda 'duygusal savunma' ve 'korunma' ihtiyacını simgeler. Yan yan yürümesi, hedefe doğrudan gitmek yerine stratejik ve dolaylı yolları seçtiğinizi veya bir konudan kaçındığınızı anlatır.",
            symbolism: "Yengeç (Cancer burcu), Ay tarafından yönetilir; annelik, ev ve hafıza ile ilgilidir. Kıskaçlar, bir şeye sıkı sıkıya tutunmayı (bağımlılığı) veya kendini korumak için saldırganlaşmayı simgeler. Kabuk değiştirmesi, büyüme sancılarını ve savunmasız kalarak yenilenmeyi ifade eder.",
            cosmicAnalysis: "Ay'ın en güçlü sembolüdür. Duygusal gelgitleri yönetir. Dolunay'da yengeç, sakladığınız duyguların yüzeye çıkmasını ve kabuğunuzu kırmanız gerektiğini söyler.",
            commonScenarios: [
                "Yengeç ısırması/kıstırması: Geçmişten gelen bir duygunun canınızı yakmasını veya birine fazla yapışmanın verdiği zararı gösterir.",
                "Yengeç yemek: Zor bir meseleyi (kabuğu) aşarak öze (ete) ulaşmayı ve güçlenmeyi simgeler.",
                "Denizde yengeç: Bilinçdışındaki korkuların veya komplekslerin hareketliliğini ifade eder."
            ],
            cta: "Kabuğunuz sizi koruyor mu yoksa hapsediyor mu? Dream Boat ile duygusal zırhınızı inceleyin."
        }
    },
    {
        slug: 'octopus',
        data: {
            localizedName: "Ahtapot",
            title: "Rüyada Ahtapot Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada ahtapot görmek, karmaşıklığı, çok yönlülüğü, sahiplenmeyi ve zekayı simgeler.",
            introduction: "Denizlerin sekiz kollu dehası Ahtapot, rüyalarda 'çok yönlü kontrolü' ve 'kaotik karmaşayı' aynı anda simgeler. Birden fazla işle uğraşan, her yere yetişmeye çalışan veya bir durumu her yönüyle sarmalayan bir zihniyeti temsil eder.",
            symbolism: "Ahtapot, zekası ve kılık değiştirmesiyle adaptasyonu; kollarıyla ise sahipleniciliği ve boğucu bir anneyi/ilişkiyi simgeleyebilir. Mürekkep püskürtmesi, kaçmak için ortalığı bulandırmayı ve gerçeği gizlemeyi anlatır. Sekiz sayısı, sonsuz döngüyü ve karmayı işaret eder.",
            cosmicAnalysis: "Neptün (derin deniz/illüzyon) ve Ay (bilinçdışı) etkisindedir. Küçülen Ay'da, sizi saran ve hareket etmenizi engelleyen toksik bağlardan (kollardan) kurtulma zamanıdır.",
            commonScenarios: [
                "Ahtapotun sarılması: Birinin veya bir durumun sizi hapsettiğini, nefes almanızı engellediğini hissettiğinizi gösterir.",
                "Ahtapot yemek/avlamak: Karmaşık bir sorunu çözmeyi ve kontrolü ele almayı simgeler.",
                "Renk değiştiren ahtapot: Çevrenizdeki iki yüzlü insanlara veya duruma göre şekil alan bir karaktere işaret eder."
            ],
            cta: "Hayatınızın ipleri kimin elinde? Dream Boat uygulamasını indirin ve karmaşayı çözün."
        }
    },
    {
        slug: 'jellyfish',
        data: {
            localizedName: "Denizanası",
            title: "Rüyada Denizanası Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada denizanası görmek, bilinçdışı akışını, edilgenliği ve gizli tehlikeleri simgeler.",
            introduction: "Akıntıyla sürüklenen şeffaf hayalet Denizanası, rüyalarda 'akışa teslim olmayı' ama aynı zamanda 'görünmez tehlikeleri' simgeler. Beyni ve kalbi olmayan (biyolojik olarak) bu canlı, rasyonel düşünceden uzak, saf içgüdüsel ve duygusal tepkileri temsil eder.",
            symbolism: "Denizanası, rüya sahibinin hayatta inisiyatif almadığını, olayların akışına kapıldığını gösterebilir. Şeffaflığı, dürüstlüğü veya savunmasızlığı; yakıcı dokunaçları ise beklenmedik yerden gelen acıyı veya travmayı simgeler. Güzelliği yanıltıcı, dokunuşu can yakıcıdır.",
            cosmicAnalysis: "Neptün (sular/belirsizlik) yönetimindedir. Bilinçdışının en derin ve kontrol edilemez katmanıdır. Dolunay'da, bastırılmış ve görmezden gelinen acı verici duyguların yüzeye çıkışıdır.",
            commonScenarios: [
                "Denizanası sokması: Güvendiğiniz bir alanda (duygusal sularda) alacağınız ani bir darbeyi veya şoku simgeler.",
                "Denizanası sürüsü: Çözülmemiş duygusal sorunların birikip yüzmeniz gereken yolu kapattığını gösterir.",
                "Karaya vurmuş denizanası: Tehdit oluşturmayan ama bitmiş bir duygusal durumu veya tükenmişliği ifade eder."
            ],
            cta: "Akıntıda mı sürükleniyorsunuz? Dream Boat ile kendi rotanızı çizin."
        }
    },
    {
        slug: 'squid',
        data: {
            localizedName: "Mürekkep Balığı (Kalamar)",
            title: "Rüyada Mürekkep Balığı Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada mürekkep balığı görmek, bilinçdışının derinliklerini, kaçışı ve gizlenmeyi simgeler.",
            introduction: "Derin suların gizemli sakinleri Kalamar ve Mürekkep Balığı, rüyalarda 'bilinçaltının karanlık sularını' ve 'savunma mekanizmalarını' temsil eder. Tehdit anında mürekkep salarak gözden kaybolması, gerçeklerle yüzleşmekten kaçınma eğilimini anlatır.",
            symbolism: "Bu canlılar, görülmek istemeyen yönlerimizi, gölge benliğimizi simgeler. Mürekkep, aynı zamanda yaratıcılığı ve yazmayı (sanat) da ifade edebilir; karanlığı sanata dönüştürme gücüdür. Dev kalamar, bilinçdışında büyüyen korkuların canavarlaşmasını simgeler.",
            cosmicAnalysis: "Plüton (karanlık/derinlik) ve Neptün etkisindedir. Yeni Ay'da, iç dünyanızdaki gizli yaratıcılığı keşfetme veya korkularınızla yüzleşme çağrısıdır.",
            commonScenarios: [
                "Mürekkep püskürtmesi: Bir konuda kafanızı karıştıranları, gerçeği görmenizi engelleyen sis perdesini gösterir.",
                "Kalamar yemek: Bilinmeyeni sindirmeyi, korkuları yenip onlardan beslenmeyi simgeler.",
                "Dev kalamar saldırısı: Kontrolü kaybettiğinizi hissettiğiniz büyük bir anksiyete krizini veya panik atağı yansıtabilir."
            ],
            cta: "Karanlıkta ne saklıyorsunuz? Dream Boat uygulamasını indirin ve iç dünyanızı aydınlatın."
        }
    },
    {
        slug: 'seal',
        data: {
            localizedName: "Fok",
            title: "Rüyada Fok Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada fok görmek, oyunculuğu, yaratıcılığı, uyumu ve içsel sesi simgeler.",
            introduction: "Hem karada hem suda yaşayan, oyuncu doğasıyla bilinen Fok, rüyalarda 'neşe', 'yaratıcılık' ve 'bilinçdışıyla uyum' sembolüdür. O, duygusal derinliklerde (okyanus) yüzebilen ama gerçeklik zemininde (kara) de dinlenebilen dengeli bir ruh halini anlatır.",
            symbolism: "Selkie mitlerinde foklar, deri değiştiren büyülü varlıklardır; bu da dönüşümü ve özgün benliği simgeler. Fokun alkışlaması veya ses çıkarması, kendini ifade etme ve onaylanma isteğidir. Oyuncu hareketleri, hayatı çok ciddiye almamayı ve İçindeki Çocuk ile bağ kurmayı öğütler.",
            cosmicAnalysis: "Neptün (hayal gücü) ve Merkür (oyun/iletişim) etkisindedir. Büyüyen Ay'da, yaratıcı projelerde başarıyı ve sosyal çevrede sevilen biri olmayı müjdeler.",
            commonScenarios: [
                "Fokla yüzmek: Duygularınızla barışık olduğunuzu, akışta kalabildiğinizi gösterir.",
                "Fok balığı gösterisi: Yeteneklerinizi başkalarını memnun etmek için kullandığınızı, belki de kendiniz olmaktan çıktığınızı işaret edebilir.",
                "Yaralı fok: Neşenizin çalındığını, yaratıcılığınızın engellendiğini simgeler."
            ],
            cta: "Hayatınızda oyuna yer var mı? Dream Boat ile neşenizi geri kazanın."
        }
    },
    {
        slug: 'walrus',
        data: {
            localizedName: "Mors (Deniz Aygırı)",
            title: "Rüyada Mors Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada mors görmek, koruyuculuğu, kalın derili olmayı, otoriteyi ve yavaş gücü simgeler.",
            introduction: "Devasa cüssesi ve heybetli dişleriyle Mors, rüyalarda 'sarsılmaz gücü' ve 'koruyucu otoriteyi' temsil eder. Kalın derisi, dış eleştirilere ve zorlu koşullara (soğuk) karşı geliştirilen duygusal zırhı simgeler.",
            symbolism: "Mors, sosyal hiyerarşiyi ve dominansı temsil eder. Dişleri, kendini savunma ve statü sembolüdür. Hantal görünse de suda çeviktir; bu da göründüğünden daha yetenekli veya tehlikeli olabilen bir durumu/kişiyi anlatır. 'Kalın derili olmak', duyarsızlığı veya dayanıklılığı ifade edebilir.",
            cosmicAnalysis: "Satürn (koruma/engel) ve Plüton (güç) etkisindedir. Dolunay'da, bir otorite figürüyle (baba/patron) yaşanacak bir güç mücadelesini veya kendi sınırlarınızı koruma ihtiyacını gösterir.",
            commonScenarios: [
                "Mors sürüsü: Kendi kuralları olan kapalı bir topluluğu veya iş ortamını simgeler.",
                "Mors dişi: Değerli bir ganimeti, zor kazanılmış bir başarıyı temsil eder.",
                "Morsun saldırması: Otoritenizin sarsıldığını veya güçlü bir rakiple karşılaşacağınızı işaret eder."
            ],
            cta: "Zırhınız sizi neyden koruyor? Dream Boat uygulamasını indirin ve gücünüzü analiz edin."
        }
    }
];

symbols.forEach(item => {
    const filePath = path.join(outputDir, `${item.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(item.data, null, 2));
    console.log(`Generated: ${item.slug}.json`);
});
