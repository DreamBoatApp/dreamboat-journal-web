const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../content/tr/meanings');

const foods = [
    {
        slug: 'burger',
        data: {
            localizedName: "Hamburger",
            title: "Rüyada Hamburger Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada hamburger görmek, hızlı tatmin arayışını ve maddi doyumu simgeler.",
            introduction: "Modern yaşamın hızlı temposunda Hamburger, 'anlık tatmin' ve 'maddi doygunluk' arzusunun sembolüdür. Ancak bu imge, ruhun derinliklerinde daha ilkel bir açlığa, avcı-toplayıcı dürtülerin (et) ve tarımsal medeniyetin (ekmek) birleşimine işaret eder.",
            symbolism: "Hamburger, katmanlı yapısı itibariyle yaşamın farklı düzlemlerini temsil eder. Ekmek (temel ihtiyaçlar) ve Et (yaşamsal güç) arasındaki bu birliktelik, arzularınızın ne kadar hızlı ve kolay yoldan karşılanmasını istediğinizi gösterir. Eğer hamburgeri keyifle yiyorsanız, dünya nimetlerinden faydalanma dönemindesinizdir. Ancak aceleyle yiyorsanız, ruhsal bir boşluğu maddi şeylerle doldurma çabası olabilir.",
            cosmicAnalysis: "Ay'ın Büyüyen Ay evresinde görülen hamburger, maddi kazançların ve keyifli zamanların artışına işaret eder. Dolunay'da ise, doyum noktasına ulaştığınızı ancak aşırılıklardan kaçınmanız gerektiğini hatırlatır.",
            commonScenarios: [
                "Hamburger sipariş etmek: Hayatınızda hızlı çözümler ve pratik sonuçlar beklediğinizi gösterir.",
                "Dev bir hamburger yemek: Gözünüzün yükseklerde olduğunu veya tatmin edilmesi zor bir hırsa sahip olduğunuzu simgeler.",
                "Hamburgerin içini açmak: Size sunulan bir fırsatın veya durumun gerçek yüzünü inceleme ihtiyacınızı yansıtır."
            ],
            cta: "Rüyanızdaki lezzetler, ruhunuzun neye aç olduğunu fısıldar. Dream Boat uygulamasını indirin ve içsel açlığınızın kaynağını keşfedin."
        }
    },
    {
        slug: 'ice-cream',
        data: {
            localizedName: "Dondurma",
            title: "Rüyada Dondurma Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada dondurma görmek, geçici hazları, çocuksu neşeyi ve anı yaşamayı simgeler.",
            introduction: "Dondurma, rüyalar aleminde 'geçiciliğin' ve 'hazzın' en tatlı hatırlatıcısıdır. Formunu koruyamayan ve eriyip giden yapısıyla, sahip olduğunuz güzelliklerin ve anların kıymetini bilmeniz gerektiğine dair narin bir bilgelik sunar.",
            symbolism: "Psikolojik olarak dondurma, İçimizdeki Çocuk arketipine seslenir. Saf neşe, oyun ve ödül ihtiyacını temsil eder. Ancak erimesi, zamanın akışına ve fırsatların kaçabileceğine dair bir uyarıdır. Eğer dondurmayı düşürdüyseniz, kaçırılmış bir fırsattan duyulan hayal kırıklığını; paylaşıyorsanız, mutluluğun paylaştıkça çoğalacağını simgeler.",
            cosmicAnalysis: "Dondurma rüyaları, Ay'ın Küçülen Ay evresinde görüldüğünde, elinizdeki bir değerin yavaş yavaş kaybolmakta olduğuna veya bir dönemin sona erdiğine işaret edebilir. Yeni Ay'da ise, kendinizi şımartacağınız yeni bir başlangıcın habercisidir.",
            commonScenarios: [
                "Dondurmanın erimesi: Zamanın aleyhinize işlediğini veya bir fırsatın kaçmakta olduğunu hissettiğinizi gösterir.",
                "Çeşit çeşit dondurma görmek: Hayatın size sunduğu seçenekler arasında kararsız kaldığınızı ancak bu bolluğun tadını çıkarmanız gerektiğini belirtir.",
                "Dondurma ikram etmek: Çevrenizdeki insanlara neşe ve mutluluk dağıtma arzunuzu yansıtır."
            ],
            cta: "Hayat dondurma gibidir, erimeden tadını çıkarın. Dream Boat ile rüyalarınızdaki mesajları zamanında yakalayın."
        }
    },
    {
        slug: 'milk',
        data: {
            localizedName: "Süt",
            title: "Rüyada Süt Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada süt görmek, saf beslenmeyi, anaçlığı ve ruhsal gelişimi simgeler.",
            introduction: "Süt, evrensel bilinçdışında 'İlk Besin' ve 'Saf Yaşam' kaynağıdır. Rüyada görülmesi, ruhun en temel, en saf ve en korunaklı haline dönme arzusunu; şefkat ve koşulsuz sevgiyle beslenme ihtiyacını temsil eder.",
            symbolism: "Jungiyen sembolizmde süt, Ana Arketipi (Mother Archetype) ile doğrudan bağlantılıdır. Süt içmek, evrensel kaynaktan beslenmeyi ve bilgeliği içine çekmeyi simgeler. Dökülen süt, küçük kayıpları veya duygusal israfı; ekşimiş süt ise bozulan ilişkileri veya zehirli bir hale gelen saf duyguları işaret eder.",
            cosmicAnalysis: "Ay, astrolojide 'Ana'yı ve 'Sütü' yönetir. Dolunay evresinde görülen süt, duygusal doygunluğa ve berekete işaret ederken, Yeni Ay evresinde yeni bir öğrenme veya büyüme sürecinin başlangıcını (bebeklik dönemi gibi) müjdeler.",
            commonScenarios: [
                "Süt içmek: Ruhsal veya fiziksel olarak şifalanma ve güçlenme sürecinde olduğunuzu gösterir.",
                "Süt dökmek: Önemsiz kayıplar için üzülmemeniz gerektiğini, kaynağın hala orada olduğunu hatırlatır.",
                "Süt kaynatmak: Duygularınızı veya projelerinizi olgunlaştırma, sabırla 'pişirme' sürecinizi simgeler."
            ],
            cta: "Ruhunuzun hangi besine ihtiyacı var? Dream Boat uygulamasını indirin ve rüyalarınızdaki anaç rehberliği keşfedin."
        }
    },
    {
        slug: 'watermelon',
        data: {
            localizedName: "Karpuz",
            title: "Rüyada Karpuz Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada karpuz görmek, bolluğu, duygusal zenginliği ve sürpriz gelişmeleri simgeler.",
            introduction: "Sert kabuğunun altında sakladığı sulu ve canlı özüyle Karpuz, 'gizli hazinelerin' ve 'duygusal derinliğin' sembolüdür. Rüyada belirmesi, dışarıdan sert veya kapalı görünen bir durumun içinde büyük bir canlılık ve bereket barındırdığını fısıldar.",
            symbolism: "Karpuz, içindeki çok sayıdaki çekirdeğiyle 'doğurganlık' ve 'yeni fikirler' anlamına gelir. Kırmızı renk, tutku ve canlılığı; yeşil kabuk ise korumayı ve dünyevi alemi temsil eder. Bir karpuzu kesmek, bir gizemi çözmek veya bir ilişkinin/işin meyvesini almak (içini görmek) anlamına gelir.",
            cosmicAnalysis: "Dolunay döneminde görülen karpuz, tamamlanmış projeleri ve elde edilecek büyük başarıları simgeler. Büyüyen Ay'da ise, içinizde büyüyen bir sevginin veya projenin olgunlaşma sürecini işaret eder.",
            commonScenarios: [
                "Karpuz kesmek: Karar alma anını ve sonuca ulaşma isteğini simgeler.",
                "Kelek (ham) karpuz: Beklentilerinizin henüz karşılanmayacağını, sabırlı olmanız gerektiğini gösterir.",
                "Karpuz tarlası: Gelecekte sizi bekleyen büyük fırsatların ve bereketin habercisidir."
            ],
            cta: "Kabuğun altında ne saklı? Dream Boat ile rüyalarınızdaki gizli potansiyeli açığa çıkarın."
        }
    },
    {
        slug: 'strawberry',
        data: {
            localizedName: "Çilek",
            title: "Rüyada Çilek Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada çilek görmek, aşkı, tutkuyu ve duyusal zevkleri simgeler.",
            introduction: "Rüyaların narin mücevheri olan Çilek, aşkın, erotizmin ve 'tatlı anların' habercisidir. Kalbe benzeyen şekli ve kırmızı rengiyle, ruhun romantizm ve yakınlık arzusunu; toprağa yakın yetişmesiyle de alçakgönüllü mutlulukları simgeler.",
            symbolism: "Çilek, Venüs enerjisi taşır. Rüyada çilek yemek, hayatın sunduğu hazları kabul etmeye ve şehvetli duygulara açık olmaya işarettir. Çürük çilek, hayal kırıklığına uğramış bir aşkı veya sönen tutkuyu; olgunlaşmamış çilek ise acele edilmemesi gereken bir ilişkiyi temsil eder.",
            cosmicAnalysis: "Büyüyen Ay evresinde çilek görmek, yeni filizlenen bir aşkın veya tutkulu bir maceranın başlangıcına işaret eder. Dolunay'da ise, ilişkinizde veya yaratıcı projenizde en tatlı, en verimli döneme girdiğinizi müjdeler.",
            commonScenarios: [
                "Çilek toplamak: Emeklerinizin karşılığını, özellikle aşk hayatınızda, keyifle toplayacağınızı gösterir.",
                "Çilek reçeli: Mutluluğu kalıcı hale getirme ve güzel anıları saklama arzusunu yansıtır.",
                "Çilek ikram etmek: Sevginizi ve ilginizi başkalarıyla paylaşma isteğinizi simgeler."
            ],
            cta: "Aşk kapıyı çalıyor mu? Dream Boat uygulamasını indirin ve rüyalarınızdaki romantik işaretleri çözün."
        }
    },
    {
        slug: 'grapes',
        data: {
            localizedName: "Üzüm",
            title: "Rüyada Üzüm Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada üzüm görmek, bereketi, toplu kazancı ve kutlamayı simgeler.",
            introduction: "Salkım halindeki yapısıyla Üzüm, 'birlikten doğan gücün' ve 'kolektif bereketin' kadim sembolüdür. Rüyada görülmesi, Dionysosçu bir neşeye, hayatı kutlamaya ve emeklerin toplu halde ödüle dönüşmesine işaret eder.",
            symbolism: "Üzüm, bolluk ve zenginliktir. Salkım, aileyi veya sosyal çevreyi temsil eder. Üzüm yemek, şifalanmayı ve canlılığı; üzüm suyu veya şarap, ruhsal sarhoşluğu, aşkınlığı ve dönüşümü simgeler. Kuru üzüm ise, geçmiş tecrübelerin bilgeliğini (saklanmış enerjiyi) ifade eder.",
            cosmicAnalysis: "Dolunay'da görülen üzüm salkımı, hasat zamanının geldiğini; artık çalışmayı bırakıp sonucun tadını çıkarma vaktinin olduğunu belirtir. Küçülen Ay'da ise, kaynaklarınızı idareli kullanmanız ve geleceğe yatırım yapmanız (kurutmanız) gerektiğini söyler.",
            commonScenarios: [
                "Üzüm salkımı koparmak: Büyük bir kısmeti veya mirası elde edeceğinizi gösterir.",
                "Üzüm ezmek: Zorlukların üstesinden gelerek onları tecrübe ve başarıya (şaraba) dönüştürme sürecinizi simgeler.",
                "Ekşi üzüm: Henüz hazır olmadığınız bir başarıya veya ilişkiye dair uyarıdır."
            ],
            cta: "Hayatınızın hasat zamanı geldi mi? Dream Boat ile rüyalarınızdaki bereket sembollerini keşfedin."
        }
    },
    {
        slug: 'lemon',
        data: {
            localizedName: "Limon",
            title: "Rüyada Limon Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada limon görmek, arınmayı, şifayı ve bazen de acı gerçekleri simgeler.",
            introduction: "Keskin kokusu ve asidik tadıyla Limon, rüyalarda 'şok edici bir uyanışı' ve 'temizlenmeyi' temsil eder. O, hayatın hem ekşi (zorluklar) hem de şifalı (vitamin/arınma) yönünü; acı tecrübelerin ruhu nasıl olgunlaştırdığını anlatır.",
            symbolism: "Sarı renk, zeka ve güneştir. Limon, zihinsel berraklığı ancak bu berraklığa ulaşmak için yaşanabilecek nahoş bir süreci simgeler. Limon sıkmak, bir durumun özünü çıkarmaya veya potansiyeli zorlamaya işarettir. Ekşi tat, hayal kırıklığını veya eleştiriyi yansıtabilir.",
            cosmicAnalysis: "Küçülen Ay evresinde limon, detoks ve arınma zamanıdır; hayatınızdan toksik insanları veya alışkanlıkları atmanız gerekir. Yeni Ay'da ise, taze bir bakış açısı ve zihinsel uyanışı müjdeler.",
            commonScenarios: [
                "Limon yemek: Zor bir durumla yüzleştiğinizi ancak bunun size sağlık/şifa getireceğini gösterir.",
                "Limonata yapmak: 'Hayat sana limon verirse limonata yap' felsefesini; zorlukları fırsata çevirme yeteneğinizi simgeler.",
                "Çürük limon: Kaçırılmış bir arınma fırsatını veya içinize attığınız acı sözleri temsil eder."
            ],
            cta: "Hayatın ekşi yanları size ne öğretiyor? Dream Boat uygulamasını indirin ve rüyalarınızdaki şifa mesajlarını alın."
        }
    },
    {
        slug: 'onion',
        data: {
            localizedName: "Soğan",
            title: "Rüyada Soğan Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada soğan görmek, çok katmanlı sorunları, gözyaşıyla gelen arınmayı ve özü keşfetmeyi simgeler.",
            introduction: "Katman katman yapısıyla Soğan, insan ruhunun ve problemlerin çok boyutlu doğasını simgeler. Rüyada soğan görmek, yüzeyin altına inme cesaretini; gözyaşı dökme pahasına da olsa gerçeğe (cücüğe/öze) ulaşma yolculuğunu anlatır.",
            symbolism: "Soğan soymak, savunma mekanizmalarını veya bir sorunun perdelerini kaldırmaktır. Bu süreçte yaşanan göz yanması (ağlamak), bastırılmış duyguların serbest kalması ve katartik bir arınmadır. Soğan ayrıca dayanıklılık ve köklenmişlik sembolüdür.",
            cosmicAnalysis: "Mars enerjisi taşıyan soğan, mücadeleci bir döneme işaret edebilir. Küçülen Ay evresinde, eskiyen benlik katmanlarını soyup atma ve yenilenme zamanıdır.",
            commonScenarios: [
                "Soğan doğramak: Bilinçli bir analiz ve çözümleme sürecini; duygusal bir yükü parçalara ayırarak yönetme çabasını gösterir.",
                "Soğan yemek: Zor bir gerçeği kabul etmeyi ve sindirmeyi; şifalanmak için acı ilacı içmeyi simgeler.",
                "Filizlenmiş soğan: Eski bir sorunun veya duygunun yeniden canlandığını, fakat bu sefer büyüme potansiyeli taşıdığını belirtir."
            ],
            cta: "Hangi katmanları soyma vaktiniz geldi? Dream Boat ile rüyalarınızdaki derinlikleri keşfedin."
        }
    },
    {
        slug: 'garlic',
        data: {
            localizedName: "Sarımsak",
            title: "Rüyada Sarımsak Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada sarımsak görmek, korunmayı, şifayı ve negatif enerjiden uzaklaşmayı simgeler.",
            introduction: "Kadim zamanlardan beri koruyucu bir tılsım olan Sarımsak, rüyalarda 'ruhsal kalkan' görevi görür. Negatif enerjilere, kötü niyetlere ve hastalıklara karşı güçlü bir savunma mekanizmasının veya korunma ihtiyacının sembolüdür.",
            symbolism: "Sarımsak, güçlü kokusuyla 'iz bırakmayı' ve 'varlığını hissettirmeyi' temsil eder. Rüyada sarımsak görmek, sınırlarınızı korumanız gerektiğini hatırlatır. Aynı zamanda doğal bir antibiyotik olarak, ruhsal veya fiziksel bir enfeksiyonun (sorunun) temizlenmesi sürecine işaret eder.",
            cosmicAnalysis: "Mars ve Güneş etkisindeki sarımsak, aktif savunma ve cesaret sembolüdür. Küçülen Ay evresinde, nazar veya dedikodu gibi negatif etkilerden arınma ritüeli gibidir.",
            commonScenarios: [
                "Sarımsak yemek: Kendinizi içeriden güçlendirdiğinizi ve dış etkilere karşı bağışıklık kazandığınızı gösterir.",
                "Sarımsak kokusu: Saklanan bir gerçeğin veya bastırılamayan bir durumun açığa çıkacağını simgeler.",
                "Sarımsak asmak/bulundurmak: Evinizi veya ruhunuzu dış tehlikelere karşı güvenceye alma isteğinizi yansıtır."
            ],
            cta: "Ruhsal kalkanınız ne kadar güçlü? Dream Boat uygulamasını indirin ve rüyalarınızdaki koruma sembollerini öğrenin."
        }
    },
    {
        slug: 'potato',
        data: {
            localizedName: "Patates",
            title: "Rüyada Patates Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada patates görmek, temel ihtiyaçları, sabrı ve yeraltındaki (bilinçdışındaki) bereketi simgeler.",
            introduction: "Toprağın derinliklerinde sessizce büyüyen Patates, 'görünmeyen emeklerin' ve 'temel güvenin' sembolüdür. Rüyada patates, gösterişsiz ama hayati öneme sahip kaynaklarınızı; zor zamanlarda sizi ayakta tutan mütevazı gücünüzü temsil eder.",
            symbolism: "Patates, kök çakrayla ve dünyevi ihtiyaçlarla ilgilidir. Topraktan çıkarılması, bilinçdışındaki potansiyelin veya geçmişte harcanan emeklerin gün yüzüne çıkmasıdır. Çürük patates, ihmal edilmiş kaynakları veya boşa giden çabayı; filizlenmiş patates ise bekleyen işlerin artık eyleme geçmesi gerektiğini anlatır.",
            cosmicAnalysis: "Satürn ve Toprak elementi etkisindeki patates, sabır ve zaman sembolüdür. Kış mevsimi veya duraklama dönemlerinde, eldekini koruma ve içsel zenginliğe odaklanma mesajı verir.",
            commonScenarios: [
                "Patates soymak: Bir durumu veya kişiyi önyargılardan arındırarak özüne inme çabanızı gösterir.",
                "Patates kızartması: Temel bir ihtiyacı (beslenmeyi) keyifli bir hale getirme; hayatın tadını çıkarma isteğini simgeler.",
                "Topraktan patates çıkarmak: Büyük bir maddi veya manevi kazancın, çalışmanın ardından geleceğini müjdeler."
            ],
            cta: "Hangi cevherler toprağınızın altında bekliyor? Dream Boat ile rüyalarınızdaki kökleri keşfedin."
        }
    },
    {
        slug: 'tomato',
        data: {
            localizedName: "Domates",
            title: "Rüyada Domates Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada domates görmek, ev hayatını, doğallığı ve duygusal olgunluğu simgeler.",
            introduction: "Parlak kırmızı rengi ve sulu yapısıyla Domates, 'günlük yaşamın kalbi' ve 'doğal akışın' sembolüdür. Rüyada domates, genellikle ev ortamındaki huzuru, mutfaktaki bereketi ve duyguların sağlıklı bir şekilde ifade edilmesini anlatır.",
            symbolism: "Domates, neşe ve sağlık sembolüdür. Kırmızı renk, yaşam enerjisini ve canlılığı vurgular. Domates toplamak veya yemek, basit şeylerden mutlu olmayı ve doğayla uyumu gösterir. Domates salçası veya sosu, enerjiyi dönüştürme ve saklama; geleceğe hazırlık yapma bilincidir.",
            cosmicAnalysis: "Güneş enerjisi taşıyan domates, Büyüyen Ay evresinde haneye girecek neşeyi ve canlılığı; yaz mevsimi enerjisini (sıcaklık ve samimiyet) simgeler.",
            commonScenarios: [
                "Domates doğramak: Hazırlık yapmayı, bir projeyi veya yemeği (durumu) olgunlaştırma sürecini gösterir.",
                "Ezik veya çürük domates: Hayal kırıklığını, kaçan tadı veya bozulan bir ev huzurunu işaret edebilir.",
                "Domates tarlası/bahçesi: Ailevi mutluluğun ve doğal büyümenin habercisidir."
            ],
            cta: "Hayatınızın tadı tuzu yerinde mi? Dream Boat uygulamasını indirin ve rüyalarınızdaki ipuçlarını takip edin."
        }
    },
    {
        slug: 'eggplant',
        data: {
            localizedName: "Patlıcan",
            title: "Rüyada Patlıcan Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada patlıcan görmek, derin duyguları, saygınlığı ve olgunlaşma sürecini simgeler.",
            introduction: "Koyu mor rengiyle asalet ve gizem çağrıştıran Patlıcan, rüyalarda 'derinlikli duyguların' ve 'sofistike algıların' sembolüdür. O, sıradan bir sebzenin ötesinde, ruhun karanlık veya bilinmeyen bölgelerinden gelen bilgelik ve olgunluk mesajlarını taşır.",
            symbolism: "Mor renk, ruhsallık ve dönüşümdür. Patlıcan, hamken acı olabilen ama işlendiğinde lezzetlenen bir durum gibi, üzerinde çalışılması gereken karakter özelliklerini veya duyguları simgeler. Patlıcanlı bir yemek, karmaşık duyguların (acı ve tatlı) başarıyla harmanlanması ve entegre edilmesidir.",
            cosmicAnalysis: "Jüpiter etkisindeki patlıcan, genişleme ve bilgelik arayışıdır. Dolunay zamanı görüldüğünde, ruhsal bir meselenin tam olarak olgunlaştığını ve anlaşılmaya hazır olduğunu gösterir.",
            commonScenarios: [
                "Patlıcan közlemek: Zorlu bir süreci (ateşi) geçirerek yumuşamayı ve olgunlaşmayı; egonun incelmesini simgeler.",
                "Patlıcan musakka/yemek: Karmaşık aile ilişkilerinin veya sosyal durumların bir düzene girmesini temsil eder.",
                "Çürük patlıcan: İçe atılan ve zehirli hale gelen negatif duyguları (küsme, alınma) işaret eder."
            ],
            cta: "Ruhunuzun derin renkleri ne anlatıyor? Dream Boat ile rüyalarınızdaki sembolleri çözümleyin."
        }
    },
    {
        slug: 'cheese',
        data: {
            localizedName: "Peynir",
            title: "Rüyada Peynir Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada peynir görmek, olgunlaşmış emekleri, kazancı ve dönüşümü simgeler.",
            introduction: "Sütün zamanla ve emekle dönüşmüş hali olan Peynir, 'sabrın ödülü' ve 'olgunlaşmış sonuçlar' demektir. Rüyada peynir görmek, ham bir fikrin veya durumun, zamanla ne kadar değerli ve besleyici bir hale geldiğinin kanıtıdır.",
            symbolism: "Peynir, konsantre edilmiş enerji ve besindir. Delikli peynir, eksikliklere rağmen bütünü görebilmeyi; küflü peynir (rokfor gibi değilse), ihmalkarlığı veya eskimiş düşünceleri simgeler. Taze peynir yeni başlangıçları, eski kaşar ise köklü ve sağlam kazanımları temsil eder.",
            cosmicAnalysis: "Satürn ve Ay etkisindeki peynir, zamanın dönüştürücü gücünü anlatır. Küçülen Ay evresinde, geçmiş birikimlerinizi değerlendirme ve onlardan faydalanma zamanıdır.",
            commonScenarios: [
                "Peynir ekmek yemek: Kanaatkarlığı, elindekinin kıymetini bilmeyi ve sade bir yaşamdan duyulan huzuru gösterir.",
                "Peynir yapmak: Kendi kaderinizi şekillendirme, sabırla bir ürün ortaya koyma yeteneğinizi simgeler.",
                "Peynir tabağı: Sosyal statüyü, zenginliği ve hayatın sunduğu çeşitliliği tatmayı ifade eder."
            ],
            cta: "Emekleriniz ne zaman olgunlaşacak? Dream Boat uygulamasını indirin ve zamanın size getireceklerini öğrenin."
        }
    },
    {
        slug: 'butter',
        data: {
            localizedName: "Tereyağı",
            title: "Rüyada Tereyağı Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada tereyağı görmek, kolaylığı, zenginliği ve ilişkilerdeki yumuşamayı simgeler.",
            introduction: "Altın sarısı rengi ve kaygan yapısıyla Tereyağı, hayatın 'kolaylaşmasını' ve 'zenginleşmesini' simgeler. 'Yağ gibi kayıp gitmek' deyimindeki gibi, rüyada tereyağı, engellerin kalkacağını ve işlerin yoluna gireceğini müjdeler.",
            symbolism: "Tereyağı, sütün özünün özüdür; bu nedenle refah ve lüks sembolüdür. Ekmeğe yağ sürmek, hayatı tatlandırmayı ve yumuşatmayı; katı bir durumu (ekmek/sorun) daha yenebilir hale getirmeyi anlatır. Erimesi, egonun veya direncin yumuşamasını, kabullenmeyi temsil eder.",
            cosmicAnalysis: "Güneş ve Venüs etkisindeki tereyağı, maddi konfor ve ilişkilerdeki sıcaklıktır. Büyüyen Ay'da, kazancın artışını ve sosyal ilişkilerin pürüzsüzleşmesini işaret eder.",
            commonScenarios: [
                "Tereyağı eritmek: Bir sorunu çözmek için sıcaklık (sevgi/ilgi) göstermeniz gerektiğini; katı kuralları esnetmeyi simgeler.",
                "Tereyağlı pilav/yemek: Bereketin artmasını ve aile içinde ağız tadını gösterir.",
                "Bozuk tereyağı: Sahte vaatlere veya dışı güzel ama özü bozulmuş durumlara karşı uyarıdır."
            ],
            cta: "Hayatınızda işler ne zaman yoluna girecek? Dream Boat ile rüyalarınızdaki işaretleri takip edin."
        }
    },
    {
        slug: 'yogurt',
        data: {
            localizedName: "Yoğurt",
            title: "Rüyada Yoğurt Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada yoğurt görmek, mayalanmayı, sabrı, sağlığı ve arınmayı simgeler.",
            introduction: "Sütün mayalanarak dönüşmesiyle oluşan Yoğurt, 'canlı bir kültürün' ve 'içsel değişimin' sembolüdür. Rüyada yoğurt, pasif gibi görünen bir bekleme sürecinin aslında ne kadar aktif ve dönüştürücü bir yaratım süreci olduğunu anlatır.",
            symbolism: "Beyazlığıyla saflığı, ekşiliğiyle gerçekliği, mayasıyla ise 'bulaşıcı iyiliği' veya bilgiyi temsil eder. Yoğurt yemek, şifalanmak ve bedeni/ruhu temizlemektir. Yoğurt mayalamak, bir fikri veya projeyi aşılamayı ve onun tutmasını beklemeyi (sabrı) simgeler.",
            cosmicAnalysis: "Ay döngüleriyle yakından ilgilidir. Dolunay'da mayalanan yoğurt (rüya), niyetlerinizin tuttuğunu ve somutlaştığını gösterir. Yeni Ay'da ise, yeni bir niyet tohumu ekme zamanıdır.",
            commonScenarios: [
                "Yoğurt yemek: İçsel huzuru bulmayı ve sağlıklı kararlar almayı simgeler.",
                "Yoğurdun ekşimesi: Bir işin veya ilişkinin beklediğiniz gibi sonuçlanmadığını; süreci çok uzattığınızı gösterebilir.",
                "Sarımsaklı yoğurt: Hem şifa hem koruma (sarımsak) arayışını; gücünüzü ve sağlığınızı perçinlemeyi ifade eder."
            ],
            cta: "Niyetleriniz ne zaman tutacak? Dream Boat uygulamasını indirin ve rüyalarınızdaki mayayı keşfedin."
        }
    },
    {
        slug: 'soup',
        data: {
            localizedName: "Çorba",
            title: "Rüyada Çorba Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada çorba görmek, duygusal iyileşmeyi, sıcaklığı ve basit çözümleri simgeler.",
            introduction: "Sıcak, sıvı ve besleyici yapısıyla Çorba, rüyaların 'duygusal merhemi'dir. Hasta olduğumuzda veya üşüdüğümüzde aradığımız çorba, rüyada görüldüğünde ruhun ilgiye, şefkate ve karmaşık olmayan, sindirimi kolay bir sevgiye olan ihtiyacını haykırır.",
            symbolism: "Çorba, malzemelerin birleşip erimesiyle oluşan homojen bir bütündür; bu da uyumu ve uzlaşmayı simgeler. Kaynar çorba, acelecilikten doğan sıkıntıları; soğuk çorba, ilgisizliği veya kaçırılmış bir teselliyi anlatır. Çorba içmek, ruhsal enerjiyi yenilemek ve içsel soğukluğu (yalnızlığı) gidermektir.",
            cosmicAnalysis: "Su elementi ve Ay etkisindeki çorba, duygusal akışkanlıktır. Küçülen Ay evresinde, bedeni ve ruhu dinlendirme, sadeleşme çağrısıdır.",
            commonScenarios: [
                "Çorba karıştırmak: Hayatınızdaki olayları veya duyguları harmanlama, bir dengeye oturtma çabanızı gösterir.",
                "Çorba taşırmak: Duygusal bir patlamayı veya yönetemediğiniz yoğun hisleri simgeler.",
                "Şehriye/tarhana çorbası: Geleneksel değerlere dönüşü ve aile bağlarından gelen güven hissini temsil eder."
            ],
            cta: "Ruhunuzu ısıtacak müjde ne? Dream Boat ile rüyalarınızdaki şifa kaynağını bulun."
        }
    },
    {
        slug: 'sandwich',
        data: {
            localizedName: "Sandviç",
            title: "Rüyada Sandviç Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada sandviç görmek, sıkışmışlığı, pratik çözümleri ve hayatın katmanlarını simgeler.",
            introduction: "İki ekmek arasına sıkıştırılmış malzemelerle Sandviç, rüyalarda genellikle 'arada kalmışlık' hissiyle 'pratik çözüm' arayışı arasındaki dengeyi temsil eder. Bazen hayatın bizi iki baskı unsuru (zorunluluklar ve istekler) arasında sıkıştırdığını; bazen de her şeyi bir arada, hızlıca halletme becerisini simgeler.",
            symbolism: "Sandviçin içeriği, deneyiminizin kalitesini belirler. Ekmekler dış koşulları, iç malzeme ise sizin asıl deneyiminizi (duygularınızı) temsil eder. Sandviç hazırlamak, kısıtlı imkanlarla veya zamanla en iyi sonucu yaratma çabasıdır.",
            cosmicAnalysis: "Merkür etkisindeki sandviç, hareket halindeyken (yolculukta/işte) beslenme ihtiyacını, dolayısıyla adaptasyonu simgeler. Yeni Ay evresinde, yeni bir yola çıkarken yapılan hazırlığı işaret eder.",
            commonScenarios: [
                "Yarım sandviç: Tamamlanmamış bir işi veya tatmin etmeyen bir ilişkiyi gösterir.",
                "Sandviç yapmak: Hayatınızın farklı yönlerini (iş/özel hayat) bir araya getirip taşınabilir, yönetilebilir bir format yaratma becerinizi simgeler.",
                "Kocaman bir sandviç: Üstesinden gelmeniz gereken çok katmanlı bir sorumluluğu veya görevi işaret eder."
            ],
            cta: "Hayat sizi nerede sıkıştırıyor? Dream Boat uygulamasını indirin ve çıkış yolunu rüyalarınızda bulun."
        }
    },
    {
        slug: 'noodles',
        data: {
            localizedName: "Erişte / Makarna",
            title: "Rüyada Erişte (Noodle) Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada erişte veya uzun makarna görmek, uzun ömrü, karmaşık ilişkileri ve sürekliliği simgeler.",
            introduction: "Uzun, dolambaçlı ve birbirine geçmiş yapısıyla Erişte (Noodle), rüyalarda 'yaşam yolunun' ve 'ilişkiler ağının' sembolüdür. Çekildikçe uzayan yapısı, sabrı, uzun ömrü ve bazen de çözülmesi gereken karmaşık düğümleri anlatır.",
            symbolism: "Uzak Doğu sembolizminde uzun noodle, uzun ömür demektir. Rüyada kase içinde noodle görmek, hayatınızdaki olayların birbirine nasıl bağlı olduğunu (karmaşık neden-sonuç ilişkileri) anlamaya çalışmaktır. Düğümlenmiş makarna, kafa karışıklığını veya içinden çıkılamayan bir durumu; taze makarna ise üretkenliği ve bereketi simgeler.",
            cosmicAnalysis: "Merkür ve Ay düğümleriyle ilişkili olabilir. Yolların kesişmesini ve kader ağlarını temsil eder. Dolunay'da, karmaşık bir durumun nihayet çözüleceğini veya bir sonuca (yemeğe) varacağını müjdeler.",
            commonScenarios: [
                "Erişte kesmek: Hayat yolunda kendi sınırlarınızı belirlemeyi veya uzun süren bir sorunu 'kesip atmayı' (sonlandırmayı) simgeler.",
                "Sıcak noodle çorbası: Karmaşık zamanlarda içinizi ısıtacak bir desteği veya konforu bulacağınızı gösterir.",
                "Makarna süzmek: Duygusal fazlalıkları (suyu) atıp, elinizde kalan somut gerçeklere (makarnaya) odaklanma zamanıdır."
            ],
            cta: "Hayat ipinizin ucu nereye varıyor? Dream Boat ile rüyalarınızdaki kader ağlarını çözümleyin."
        }
    }
];

foods.forEach(item => {
    const filePath = path.join(outputDir, `${item.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(item.data, null, 2));
    console.log(`Generated: ${item.slug}.json`);
});
