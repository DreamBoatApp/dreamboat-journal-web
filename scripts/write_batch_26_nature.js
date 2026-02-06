const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../content/tr/meanings');

const symbols = [
    // NATURE & PLACES (22 Items)
    {
        slug: 'mountain',
        data: {
            localizedName: "Dağ",
            title: "Rüyada Dağ Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada dağ görmek, engelleri, zirveyi, ruhsal yükselişi ve hedefleri simgeler.",
            introduction: "Yerin göğe uzanan eli Dağ, rüyalarda 'aşılması gereken engelleri' ve 'ruhsal zirve'yi simgeler. Heybetiyle hem hayranlık hem de korku uyandıran dağ, hayatın büyük sınavlarının ve potansiyel zaferlerin anıtıdır.",
            symbolism: "Dağa tırmanmak, çabayı, hırsı ve ruhsal tekamülü; zirveye ulaşmak, başarıyı ve genişleyen vizyonu anlatır. Dağdan inmek, bir dönemin bitişi veya tevazuya dönüş olabilir. Dağın yolu kapaması, büyük bir blokajı; karlı dağ, yalnızlığı ve saflığı simgeler. Volkanik dağ, bastırılmış öfkeyi gösterir.",
            cosmicAnalysis: "Satürn (zorluk/yükseliş) ve Oğlak burcu enerjisidir. Dünyevi başarıyı ve statüyü yönetir. Dolunay'da dağ zirvesi, aydınlanmayı ve hedefe ulaşmayı müjdeler.",
            commonScenarios: [
                "Dağ manzarası: Gelecekteki hedeflerinizi uzaktan izlediğinizi, büyük resmi gördüğünüzü simgeler.",
                "Dağdan düşmek: Ani bir başarısızlığı, statü kaybını veya kibri yüzünden zarar görmeyi ifade eder.",
                "Dağ evi: İnzivayı, huzuru ve dünyevi dertlerden uzaklaşma isteğini gösterir."
            ],
            cta: "Hangi zirveye tırmanıyorsunuz? Dream Boat ile engelleri aşmanın yolunu bulun."
        }
    },
    {
        slug: 'valley',
        data: {
            localizedName: "Vadi",
            title: "Rüyada Vadi Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada vadi görmek, korunaklı alanı, bereketi, yaşam yolunu ve depresyonu simgeler.",
            introduction: "İki dağın arasındaki yeşil kucak Vadi, rüyalarda 'güvenli geçişi' ve 'yaşamın bereketli alanlarını' simgeler. Ancak bazen de 'gölgeler diyarı' olarak, depresyonu ve hayatın dip noktalarını temsil edebilir.",
            symbolism: "Yeşil vadi, huzuru, verimliliği ve kolay rızkı anlatır. Kurak vadi, ruhsal boşluğu gösterir. Vadiden yürümek, hayat yolculuğunda (Tao) akışla birlikte ilerlemektir. Dağların gölgesinde kalmak, bir otoritenin baskısını hissetmek veya korunma ihtiyacını simgeler.",
            cosmicAnalysis: "Venüs (doğa/güzellik) ve Plüton (derinlik) etkisindedir. Boğa burcuyla ilişkilidir. Büyüyen Ay'da, hayatınızın en verimli ve huzurlu dönemine girdiğinizi işaret eder.",
            commonScenarios: [
                "Vadiye bakmak: Seçeneklerinizi değerlendirdiğinizi, aşağıya (bilinçdışına) inmeyi düşündüğünüzü gösterir.",
                "Karanlık vadi: Zorlu bir yaşam sınavını, 'ölüm gölgesi vadisi' metaforundaki gibi korkularla yüzleşmeyi simgeler.",
                "Vadide nehir: Yaşam enerjisinin (duyguların) vadiden akıp gitmesi, hayatın doğal akışını ve sağlığı müjdeler."
            ],
            cta: "Hangi vadiden geçiyorsunuz? Dream Boat ile yolunuzdaki işaretleri okuyun."
        }
    },
    {
        slug: 'cave',
        data: {
            localizedName: "Mağara",
            title: "Rüyada Mağara Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada mağara görmek, bilinçdışını, ana rahmini, sığınmayı ve gizemi simgeler.",
            introduction: "Yerin karanlık ağzı Mağara, rüyalarda 'Bilinçdışına İniş'in ve 'Ana Rahmi'nin en güçlü sembolüdür. O, hem korkutucu bir karanlık hem de güvenli bir sığınaktır; kahramanın yolculuğunda (Joseph Campbell) hazinenin saklı olduğu en dip noktadır.",
            symbolism: "Mağaraya girmek, kendi iç dünyanızı keşfetmeye, korkularınızla yüzleşmeye veya köklerinize dönmeye cesaret etmektir. Mağaradan çıkmak, yeniden doğuşu ve aydınlanmayı simgeler. Mağara adamı/duvar resimleri, ilkel dürtüleri ve kolektif hafızayı çağrıştırır.",
            cosmicAnalysis: "Plüton (yeraltı) ve Ay (rahim/gizlilik) yönetimindedir. Akrep burcu enerjisi taşır. Yeni Ay'da mağaraya girmek, içsel bir dönüşüm sürecinin başladığını gösterir.",
            commonScenarios: [
                "Mağarada saklanmak: Dış dünyadan kaçışı, inzivayı veya bir tehlikeden korunma ihtiyacını simgeler.",
                "Karanlık mağara: Bilinmeyenden duyulan korkuyu ve bastırılmış travmaları ifade eder.",
                "Işıklı mağara: İçsel bilgeliği bulmayı, ruhsal bir hazineye ulaşmayı müjdeler."
            ],
            cta: "İçinizdeki mağarada ne saklı? Dream Boat uygulamasını indirin ve karanlığı aydınlatın."
        }
    },
    {
        slug: 'forest',
        data: {
            localizedName: "Orman",
            title: "Rüyada Orman Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada orman görmek, bilinmeyeni, büyüme potansiyelini, kaybolmayı ve doğayı simgeler.",
            introduction: "Ağaçların oluşturduğu yeşil okyanus Orman, rüyalarda 'bilinçdışının karmaşık yapısını' ve 'doğal içgüdüleri' simgeler. Masallarda kahramanın kaybolduğu ama kendini bulduğu yerdir; hem tehlike hem de şifa barındırır.",
            symbolism: "Sık orman, kafa karışıklığını veya içinde kaybolduğunuz detayları; aydınlık orman, huzuru ve büyümeyi anlatır. Orman yangını, kontrol edilemeyen öfkeyi veya büyük bir dönüşümü (eskinin yanıp yeninin gelmesi) simgeler. Vahşi hayvanlar, bastırılmış dürtülerdir.",
            cosmicAnalysis: "Jüpiter (büyüme) ve Neptün (gizem/sis) etkisindedir. Dolunay'da ormanda yürümek, sezgilerinizin en güçlü olduğu ve ruhsal rehberlerle karşılaşabileceğiniz zamandır.",
            commonScenarios: [
                "Ormanda kaybolmak: Hayat yolunda yönünüzü şaşırdığınızı, belirsizlik içinde olduğunuzu hissettirir.",
                "Orman yolu: Kendi iç dünyanıza veya geleceğe giden patikada ilerlediğinizi gösterir.",
                "Ağaç kesmek: Doğaya veya kendi köklerinize zarar vermeyi; üretkenliği baltalamayı simgeler."
            ],
            cta: "Hangi yoldan gidiyorsunuz? Dream Boat ile ormandaki izinizi bulun."
        }
    },
    {
        slug: 'desert',
        data: {
            localizedName: "Çöl",
            title: "Rüyada Çöl Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada çöl görmek, yalnızlığı, arınmayı, zorluğu ve serabı simgeler.",
            introduction: "Uçsuz bucaksız kum denizi Çöl, rüyalarda 'mutlak yalnızlığı' ve 'sınanmayı' temsil eder. Peygamberlerin ve ermişlerin mekanı olan çöl, dünyevi olan her şeyden arınmayı, susuzluğu (ruhsal açlığı) ve sabrı anlatır.",
            symbolism: "Çöl, verimsizliği ve duygusal kuraklığı simgeleyebilir. Vaha görmek, umudu ve ilahi yardımı; serap görmek, hayal kırıklığını ve illüzyonu anlatır. Kum fırtınası, zihni bulandıran olayları ve yön kaybını gösterir. Çölü aşmak, büyük bir olgunluk sınavını vermektir.",
            cosmicAnalysis: "Güneş (yakıcı sıcak) ve Satürn (yoksunluk) etkisindedir. Yaz dönemi enerjisidir. Küçülen Ay'da, sadeleşme ve maddi dünyadan kopuş sürecini işaret eder.",
            commonScenarios: [
                "Çölde yürümek: Zorlu bir hayat yolculuğunu, sabır gerektiren bir süreci ve tek başına mücadeleyi simgeler.",
                "Su aramak: Duygusal beslenme, sevgi ve şifa ihtiyacını, ruhun susuzluğunu gösterir.",
                "Deveyle gitmek: Bu zorlu yolculukta dayanıklı olduğunuzu ve hedefe ulaşacak gücünüzün olduğunu belirtir."
            ],
            cta: "Hangi serabın peşindesiniz? Dream Boat uygulamasını indirin ve gerçeği bulun."
        }
    },
    {
        slug: 'island',
        data: {
            localizedName: "Ada",
            title: "Rüyada Ada Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada ada görmek, bağımsızlığı, izole olmayı, kaçışı ve iç dünyayı simgeler.",
            introduction: "Denizin ortasındaki yalnız parça Ada, rüyalarda 'bireyselliği' ve 'izolasyonu' simgeler. 'Her insan bir adadır' sözünün aksine, rüya bazen kendine yetmeyi, bazen de yalnızlıktan duyulan korkuyu veya toplumdan kaçış isteğini anlatır.",
            symbolism: "Issız ada, medeniyetten uzaklaşma, kafa dinleme (tatil) veya terk edilme hissidir. Ulaşılmaz ada, idealize edilen bir hedefi; batan ada, umutların suya düşmesini simgeler. Adada mahsur kalmak, çaresizliği değil, kendi kaynaklarınla hayatta kalmayı öğrenmeyi gösterir.",
            cosmicAnalysis: "Neptün (deniz) ve Güneş (ego/benlik) etkisindedir. Büyüyen Ay'da, kendinize ait bir alan yaratmayı ve sınırlarınızı çizmeyi simgeler.",
            commonScenarios: [
                "Adaya yüzmek: Kendi bağımsızlığınızı kazanmak için verdiğiniz çabayı ve duygusal okyanusu aşmayı simgeler.",
                "Adadan kurtarılmak: Sosyalleşme özlemini ve yeniden topluma karışma isteğini gösterir.",
                "Hazine adası: İç dünyanızda keşfedilmeyi bekleyen yetenekleri ve zenginlikleri müjdeler."
            ],
            cta: "Kendi adanızda mutlu musunuz? Dream Boat ile iç dünyanızı keşfedin."
        }
    },
    {
        slug: 'beach',
        data: {
            localizedName: "Plaj / Sahil",
            title: "Rüyada Sahil Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada plaj görmek, duygularla mantığın buluşmasını, dinlenmeyi ve geçişi simgeler.",
            introduction: "Kara (bilinç) ile Denizin (bilinçdışı) buluştuğu sınır olan Sahil, rüyalarda 'geçiş bölgesini' ve 'huzuru' simgeler. İki dünyanın kıyısında durmak, duygularınızla yüzleşmeye hazır olduğunuzu ama hala güvenli zeminde (karada) durduğunuzu gösterir.",
            symbolism: "Kumsalda yürümek, hayatın karmaşasından uzaklaşmayı ve iç sesini dinlemeyi anlatır. Dalgaların sahile vurması, duyguların zaman zaman yükselip alçalmasını; kumdan kale yapmak, geçici hevesleri ve zamanın yıkıcılığını (dalga gelince gider) simgeler. Güneşlenmek, enerjiyi yenilemektir.",
            cosmicAnalysis: "Ay (medcezir) ve Güneş (kum/sıcak) dengesidir. Yengeç burcu enerjisi taşır. Yeni Ay'da sahil, yeni bir duygusal başlangıcın (denize girmenin) kıyısında olduğunuzu müjdeler.",
            commonScenarios: [
                "Çakıllı sahil: Ufak tefek zorluklara rağmen huzura ulaşacağınızı, yolun biraz pürüzlü olduğunu gösterir.",
                "Fırtınalı sahil: Bilinçdışının (denizin) taştığını, duygusal bir krizin kapıda olduğunu işaret eder.",
                "Sahilde bir şey bulmak: Bilinçdışından gelen bir mesajı veya hediyeyi (deniz kabuğu/şişe) almayı simgeler."
            ],
            cta: "Dalgalar size ne getiriyor? Dream Boat uygulamasını indirin ve kıyıya vuran mesajları toplayın."
        }
    },
    {
        slug: 'river',
        data: {
            localizedName: "Nehir",
            title: "Rüyada Nehir Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada nehir görmek, yaşam akışını, duygusal yolculuğu, değişimi ve bereketi simgeler.",
            introduction: "Sürekli akan ve asla aynı kalmayan Nehir, rüyalarda 'yaşam enerjisinin akışını' simgeler. Herakleitos'un dediği gibi, 'Aynı nehirde iki kez yıkanılmaz'; bu rüya değişimin kaçınılmazlığını ve zamanın akıp gidişini hatırlatır.",
            symbolism: "Berrak ve sakin nehir, huzurlu bir yaşam yolunu ve sağlığı; bulanık ve taşkın nehir, duygusal karmaşayı ve kontrol kaybını anlatır. Nehri geçmek, bir engeli aşmayı veya ölüm/doğum gibi büyük bir eşikten geçmeyi (Styx nehri gibi) simgeler. Nehirde sürüklenmek, iradeyi akışa teslim etmektir.",
            cosmicAnalysis: "Ay (su) ve Mars (hareket) etkisindedir. Akrep veya Yengeç burcuyla ilişkilidir. Dolunay'da taşan nehir, tutkuların ve duyguların zirve yaptığını gösterir.",
            commonScenarios: [
                "Nehirde yüzmek: Hayatın akışıyla uyumlu olmayı, olayların üstesinden gelmeyi ve arınmayı simgeler.",
                "Kurumuş nehir: Yaşam enerjisinin tükenmesini, duygusuzluğu veya bereketsizliği işaret eder.",
                "Nehir kenarında oturmak: Hayatı bir gözlemci gibi izlemeyi, tefekkür etmeyi ve huzuru bulmayı gösterir."
            ],
            cta: "Akıntıya karşı mı yüzüyorsunuz? Dream Boat ile hayat nehrinizde doğru yönü bulun."
        }
    },
    {
        slug: 'lake',
        data: {
            localizedName: "Göl",
            title: "Rüyada Göl Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada göl görmek, içsel durgunluğu, aynalamayı, gizemi ve duygusal derinliği simgeler.",
            introduction: "Durgun ve yansıtıcı yüzeyiyle Göl, rüyalarda 'içsel ayna'yı simgeler. Nehir gibi akmaz, deniz gibi dalgalanmaz (genellikle); bu nedenle ruhun sabit durumunu, birikmiş duyguları ve derin tefekkürü anlatır. Suyun altı gizem, üstü aynadır.",
            symbolism: "Berrak göl, ruhsal aydınlığı ve kendini net görmeyi; kirli göl, bulanık zihni ve toksik duyguları simgeler. Göle taş atmak, durgun bir durumu (veya kişiyi) harekete geçirmeyi; dalga yaratmayı anlatır. Göl canavarı (Loch Ness), bilinçaltındaki bastırılmış korkuları temsil eder.",
            cosmicAnalysis: "Ay (su) ve Satürn (sınırlı alan) etkisindedir. Sabit burç (Akrep/Kova) enerjisi taşıyabilir. Küçülen Ay'da göl kenarı, içe dönmek ve meditasyon yapmak için bir çağrıdır.",
            commonScenarios: [
                "Göl kenarında yürümek: Kendi iç dünyanızın sınırlarında dolaştığınızı, huzur aradığınızı gösterir.",
                "Göle düşmek: Duyguların içine aniden çekilmeyi veya bir duruma (aşka/derde) boğulmayı simgeler.",
                "Donmuş göl: Duyguların bloke olduğunu, soğukluğu veya durmuş bir ilişkiyi/işi ifade eder."
            ],
            cta: "Yansımanızda ne görüyorsunuz? Dream Boat uygulamasını indirin ve ruhunuzun aynasına bakın."
        }
    },
    {
        slug: 'waterfall',
        data: {
            localizedName: "Şelale",
            title: "Rüyada Şelale Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada şelale görmek, duygusal boşalımı, arınmayı, güçlü akışı ve yenilenmeyi simgeler.",
            introduction: "Yüksekten coşkuyla dökülen Şelale, rüyalarda 'duygusal patlamayı' ve 'radikal arınmayı' simgeler. Suyun (duyguların) yerçekimine teslim olarak serbest kalması, tutulan her şeyin (gözyaşı, öfke, neşe) akıp gitmesi gerektiğini anlatır.",
            symbolism: "Şelale, negatif iyonlarıyla ferahlığı temsil eder. Rüyada şelale altında ıslanmak, manevi bir temizliği ve yenilenmeyi müjdeler. Şelalenin gürültüsü, iç sesinizi bastıran yoğun duyguları veya olayları ifade edebilir. Tırmanmaya çalışmak, akıntıya karşı zorlu bir mücadeledir.",
            cosmicAnalysis: "Mars (enerji/güç) ve Ay (su) birleşimidir. İdrar yolları veya cinsel enerjiyle de ilgili olabilir. Dolunay'da şelale, doruk noktasına ulaşan duygusal bir rahatlamayı simgeler.",
            commonScenarios: [
                "Şelaleden atlamak: Korkusuzca değişimi kucaklamayı, risk almayı ve duyguların içine dalmayı gösterir.",
                "Şelale izlemek: Büyük bir değişimi veya olayı uzaktan hayranlıkla (veya korkuyla) seyretmeyi simgeler.",
                "Gizli şelale: Ruhunuzun derinliklerinde keşfettiğiniz yeni bir enerji kaynağını veya aşkı ifade eder."
            ],
            cta: "Kendinizi akışa bırakmaya hazır mısınız? Dream Boat ile yüklerinizden arının."
        }
    },
    {
        slug: 'volcano',
        data: {
            localizedName: "Yanardağ (Volkan)",
            title: "Rüyada Yanardağ Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada yanardağ görmek, bastırılmış öfkeyi, patlamayı, yıkımı ve ardından gelen yaratımı simgeler.",
            introduction: "Yerin ateşini kusan Yanardağ, rüyalarda 'bastırılmış duyguların' (özellikle öfke ve tutku) somut halidir. Uzun süre sessiz kalıp aniden patlamasıyla, birikimin ne kadar tehlikeli ve dönüştürücü olabileceğini gösterir.",
            symbolism: "Lav, yok edici ama aynı zamanda toprağı besleyici (yaratıcı) bir güçtür. Patlayan volkan, skandalı, kavgaları veya ani bir boşalımı (orgazm/öfke krizi) simgeler. Sönmüş volkan, geçmişte kalmış bir travmayı veya tutkuyu; dumanı tüten volkan, patlamak üzere olan bir gerginliği uyarır.",
            cosmicAnalysis: "Plüton (yeraltı ateşi) ve Mars (patlama) etkisindedir. Akrep burcu enerjisidir. Dolunay'da volkan patlaması, artık tutulamayan bir gerçeğin herkesi yakacak şekilde ortaya çıkmasıdır.",
            commonScenarios: [
                "Lavdan kaçmak: Kendi öfkenizden veya çevrenizdeki tehlikeli bir durumdan zarar görmeden sıyrılma çabasını gösterir.",
                "Volkanın içine düşmek: Bir tutkunun veya öfkenin sizi tamamen yuttuğunu, kontrolü kaybettiğinizi simgeler.",
                "Volkanik kül: Olayların durulmasını ama geride bıraktığı kasveti ve temizlenmesi gereken kalıntıları ifade eder."
            ],
            cta: "İçinizde ne birikiyor? Dream Boat uygulamasını indirin ve patlamadan önce enerjinizi yönetin."
        }
    },
    {
        slug: 'garden',
        data: {
            localizedName: "Bahçe",
            title: "Rüyada Bahçe Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada bahçe görmek, iç dünyayı, emeği, huzuru ve kişisel gelişimi simgeler.",
            introduction: "İnsanın doğayı düzenleyerek yarattığı cennet olan Bahçe, rüyalarda 'ruhsal gelişim alanı'nı simgeler. Bilinç (düzen) ile bilinçdışının (doğa) uyumlu birleşimidir. Bahçenizin durumu, ruhunuzun bakım durumunu gösterir.",
            symbolism: "Çiçekli bahçe mutluluğu ve aşkı; kurumuş bahçe ihmal edilmiş bir ruhu veya ilişkiyi anlatır. Bahçe duvarı, mahremiyeti ve sınırları simgeler. Bahçivan olmak, kendi hayatını veya başkalarını (çocukları/fikirleri) büyütme sorumluluğunu almaktır. Yabani otlar, zihni kirleten kötü düşüncelerdir.",
            cosmicAnalysis: "Venüs (güzellik) ve Ay (bitki/büyüme) etkisindedir. Boğa veya Terazi burcu enerjisi taşır. Büyüyen Ay'da bahçe sulamak, niyetlerinizi beslemek ve büyütmek için en iyi zamandır.",
            commonScenarios: [
                "Bahçe çapalamak: Zihinsel bir temizliği, sorunları kökünden halletmeyi ve emek vermeyi simgeler.",
                "Sebze bahçesi: Üretkenliği, maddi kazancı ve sonuç odaklı çalışmayı gösterir (Meyveli ağaçlar da benzerdir).",
                "Bahçe kapısı: Yeni fırsatlara, aşka veya ruhsal bir alana girişi (veya çıkışı) ifade eder."
            ],
            cta: "Ruh bahçenizde neler yetişiyor? Dream Boat ile iç dünyanızı güzelleştirin."
        }
    },
    {
        slug: 'park',
        data: {
            localizedName: "Park",
            title: "Rüyada Park Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada park görmek, sosyalleşmeyi, dinlenmeyi, oyun oynamayı ve doğayla buluşmayı simgeler.",
            introduction: "Şehrin içindeki nefes alanı Park, rüyalarda 'sosyal rahatlama' ve 'kolektif huzur' sembolüdür. Bahçeden farklı olarak kamusaldır; başkalarıyla paylaşılan, kuralları olan ama yine de özgür hissettiren bir alandır.",
            symbolism: "Parkta yürümek, stresten kaçışı ve dinginliği; çocuklar parkı, içindeki çocuğu (oyun ihtiyacını) ve geçmişe özlemi simgeler. Boş park yalnızlığı; kalabalık park sosyalleşme arzusunu gösterir. Lunapark ise (farklı bir kategori olsa da) hayatın iniş çıkışlarını ve heyecanını anlatır.",
            cosmicAnalysis: "Venüs (sosyal uyum) ve Merkür (oyun/hareket) etkisindedir. Terazi burcu (denge/toplum) ile ilişkilidir. Güneşli bir günde park, sosyal hayatınızda keyifli bir dönemi müjdeler.",
            commonScenarios: [
                "Bankta oturmak: Birini beklemeyi, hayatı gözlemlemeyi veya yaşlılık/emeklilik düşüncelerini (dinginlik) simgeler.",
                "Parkta kaybolmak: Sosyal çevrede yerini bulamama veya kalabalıklar içinde yalnız hissetme durumunu gösterir.",
                "Salıncakta sallanmak: Kararsızlığı (ileri-geri), ritmi yakalamayı veya cinsel/romantik bir heyecanı ifade edebilir."
            ],
            cta: "Nefes almaya ihtiyacınız mı var? Dream Boat uygulamasını indirin ve mola verin."
        }
    },
    {
        slug: 'bridge',
        data: {
            localizedName: "Köprü",
            title: "Rüyada Köprü Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada köprü görmek, geçişi, bağlantıyı, değişimi ve iki durum arasındaki engeli aşmayı simgeler.",
            introduction: "İki yakayı birbirine bağlayan Köprü, rüyalarda 'Büyük Geçiş'in ve 'bağlantı kurma'nın sembolüdür. Bir durumdan diğerine (geçmişten geleceğe, yaşamdan ölüme, sorundan çözüme) geçişi temsil eder.",
            symbolism: "Köprüden geçmek, bir aşamayı tamamlamayı ve değişimi kucaklamayı anlatır. Yıkık köprü, kaçırılmış fırsatı veya kopan bağı (iletişimsizliği) simgeler. Köprüden bakmak, sürece tepeden bakmayı; köprü altında olmak, evsizliği veya geçişi başaramamayı gösterir. Sırat köprüsü arketipi, sınavı çağrıştırır.",
            cosmicAnalysis: "Merkür (bağlantı/yol) ve Satürn (inşa) etkisindedir. İkizler veya Terazi burcu enerjisi taşır. Yeni Ay'da köprü geçmek, yeni bir hayata adım atmaktır.",
            commonScenarios: [
                "Asma köprü: Sallantılı ve güvensiz bir geçiş sürecini; risk alarak ilerlemeyi simgeler.",
                "Köprü inşa etmek: İnsanlar arasında arabuluculuk yapmayı veya geleceğe yatırım yapmayı gösterir.",
                "Köprüden düşmek: Başarısızlığı, korkulara yenik düşmeyi veya duygusal suya (nefre) kapılmayı ifade eder."
            ],
            cta: "Karşı kıyıya nasıl geçeceksiniz? Dream Boat ile köprülerinizi sağlamlaştırın."
        }
    },
    {
        slug: 'castle',
        data: {
            localizedName: "Kale / Şato",
            title: "Rüyada Kale Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada kale görmek, güvenliği, egoyu, başarıyı, izolasyonu ve geçmişi simgeler.",
            introduction: "Heybetli duvarları ve kuleleriyle Kale, rüyalarda 'savunma', 'güç' ve 'ulaşılmazlık' sembolüdür. O, hem güvenli bir sığınak hem de duvarların arkasına hapsolmuş bir ruhun (veya prensesin) zindanı olabilir.",
            symbolism: "Kale, egonun kalesidir; sağlamlığı karakterinizi, kapalı kapıları ise insanlara karşı ördüğünüz duvarları simgeler. Şato, masalsı hayalleri, zenginliği ve romantizmi; askeri kale, savunmayı ve savaşı anlatır. Yıkık kale, eski inançların veya gururun çöküşünü gösterir.",
            cosmicAnalysis: "Satürn (duvar/sınır) ve Güneş (kral/yönetici) etkisindedir. Aslan veya Oğlak burcuyla ilişkilidir. Dolunay'da aydınlanan kale, başarının ve tanınmanın zirvesidir.",
            commonScenarios: [
                "Kaleye girmek: Büyük bir başarı kazanmayı, elit bir zümreye katılmayı veya kendinizi güvenceye almayı simgeler.",
                "Kaleden kuşatılmak: Dış dünyadan gelen baskıları, eleştirileri ve köşeye sıkışmışlık hissini gösterir.",
                "Gizli geçitler: Kendi içinizde veya bir durumda kimsenin bilmediği çıkış yollarını (bilinçdışı yollarını) bulmayı ifade eder."
            ],
            cta: "Duvarlarınız sizi koruyor mu hapsediyor mu? Dream Boat uygulamasını indirin ve kalenizi yönetin."
        }
    },
    {
        slug: 'tower',
        data: {
            localizedName: "Kule",
            title: "Rüyada Kule Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada kule görmek, yükselişi, gözetlemeyi, kibri ve yalnızlığı simgeler.",
            introduction: "Gökyüzüne uzanan Kule, rüyalarda 'ruhsal yükselişi' ama aynı zamanda 'fildişi kulede' yaşamayı (izolasyonu) simgeler. Tarot'taki 'Yıkılan Kule' kartı gibi, bazen egonun veya yanlış temeller üzerine kurulu bir yapının çöküşünü de uyarabilir.",
            symbolism: "Kuleye tırmanmak, vizyonu genişletmeyi ve başarıyı; kuleden bakmak, olaylara yukarıdan (bazen kibirle) bakmayı anlatır. Kulede hapis kalmak (Rapunzel), beklemeyi ve kurtarılma arzusunu; kulenin yıkılması, ani bir şoku ve uyanışı simgeler.",
            cosmicAnalysis: "Uranüs (yıldırım/yıkım) ve Mars (phallus/güç) etkisindedir. Satürn de yapıyı temsil eder. Dolunay'da kule, en yüksek potansiyeli veya egonun zirvesini gösterir.",
            commonScenarios: [
                "Kule saati: Zamanın önemini ve kaçınılmaz sonu hatırlatır (Big Ben gibi).",
                "Deniz feneri (kule): Karanlıkta yol gösteren bir rehberi, umudu ve uyarıyı simgeler.",
                "Kule inşaatı: Geleceğe yönelik büyük ve iddialı planları ifade eder."
            ],
            cta: "Ne kadar yükseğe çıkabilirsiniz? Dream Boat ile zirveye giden yolu keşfedin."
        }
    },
    {
        slug: 'ruins',
        data: {
            localizedName: "Harabe / Kalıntılar",
            title: "Rüyada Harabe Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada harabe görmek, geçmişi, anıları, bitişi ve ihmal edilmiş yönleri simgeler.",
            introduction: "Yıkılmış yapıların sessiz tanığı Harabe, rüyalarda 'geçmişin izlerini' ve 'ihmal edilmişliği' simgeler. O, bir zamanlar canlı olan bir durumun (ilişki, gençlik, inanç) artık sadece iskeletinin kaldığını hatırlatır.",
            symbolism: "Antik harabeler, bilgeliği ve kökleri; savaş harabesi, travmayı ve yıkımı anlatır. Kendi evini harabe görmek, ruhsal çöküşü veya ailevi dağılmayı simgeler. Harabeler arasında dolaşmak, nostaljiyi veya geçmişte cevap aramayı gösterir. Yıkımdan sonra yeniden inşa için alan açıldığını da unutmamak gerekir.",
            cosmicAnalysis: "Satürn (zaman/eski) ve Plüton (ölüm/dönüşüm) etkisindedir. Küçülen Ay'da harabe görmek, geçmişle vedalaşma vaktinin geldiğini işaret eder.",
            commonScenarios: [
                "Harabe kazmak (Arkeoloji): Bilinçdışındaki eski anıları veya yetenekleri gün yüzüne çıkarmayı simgeler.",
                "Harabeyi restore etmek: Eski bir ilişkiyi canlandırmayı veya travmaları iyileştirme çabasını gösterir.",
                "Harabede yaşamak: Geçmişe takılıp kalmayı, ilerleyememeyi ve melankoliyi ifade eder."
            ],
            cta: "Geçmişin tozları arasında ne arıyorsunuz? Dream Boat uygulamasını indirin ve geleceği inşa edin."
        }
    },
    {
        slug: 'village',
        data: {
            localizedName: "Köy",
            title: "Rüyada Köy Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada köy görmek, sadeliği, kökleri, doğallığı ve küçük topluluğu simgeler.",
            introduction: "Şehrin karmaşasından uzak, doğayla iç içe Köy, rüyalarda 'öze dönüşü' ve 'sadeleşmeyi' simgeler. 'Köyüne dönmek' deyimi gibi, rüya sahibinin karmaşık hayattan yorulup daha basit, samimi ve doğal bir yaşam arzuladığını gösterir.",
            symbolism: "Köy, aidiyet ve geleneklerdir. Tanıdık köy, güveni; yabancı köy, yeni bir başlangıcı ama biraz da uyum zorluğunu (yabancılık çekmeyi) anlatır. Köy evi, iç huzuru; köy meydanı, dedikoduyu veya küçük topluluk baskısını simgeleyebilir. Terk edilmiş köy, yalnızlığı ve unutulmuş kökleri ifade eder.",
            cosmicAnalysis: "Ay (anne/kökler) ve Venüs (doğa) etkisindedir. Yengeç veya Boğa burcu enerjisidir. Büyüyen Ay'da köye gitmek, ruhsal bir detoks ve dinlenme ihtiyacını işaret eder.",
            commonScenarios: [
                "Köyde çalışmak: Doğal yaşama, emeğe ve topraktan gelen berekete dönüşü simgeler.",
                "Köy düğünü: Saf neşeyi, geleneksel değerleri ve toplulukla bütünleşmeyi gösterir.",
                "Köy yolunda yürümek: Nostaljiyi, geçmişe yapılan bir içsel yolculuğu ifade eder."
            ],
            cta: "Nereye aitsiniz? Dream Boat ile ruhunuzun köklerini bulun."
        }
    },
    {
        slug: 'city',
        data: {
            localizedName: "Şehir",
            title: "Rüyada Şehir Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada şehir görmek, karmaşayı, fırsatları, sosyal ağı, medeniyeti ve yabancılaşmayı simgeler.",
            introduction: "İnsanların, binaların ve ışıkların kozmosu Şehir, rüyalarda 'sosyal yaşamı', 'fırsatları' ve 'modern karmaşayı' simgeler. Labirent gibi sokaklarıyla şehir, zihnin karmaşık yapısını ve toplum içindeki yerimizi arayışımızı yansıtır.",
            symbolism: "Büyük şehir, hırsı ve anonim kalmayı; bilmedik bir şehir, yeni maceraları veya yön kaybını anlatır. Şehrin ışıkları umudu ve yapaylığı; trafiği, stres ve tıkanıklığı simgeler. Harabe şehir, medeniyetin veya kurulu düzenin çöküşüdür.",
            cosmicAnalysis: "Merkür (ticaret/iletişim) ve Kova (toplum/teknoloji) etkisindedir. Uranüs enerjisi taşır. Dolunay'da şehir manzarası, sosyal hayatınızdaki zirveyi veya kaosu aydınlatır.",
            commonScenarios: [
                "Şehirde kaybolmak: Hayatın hızı içinde kimliğini yitirme korkusunu veya seçenekler arasında boğulmayı simgeler.",
                "Şehir inşa etmek: Kendi düzeninizi kurmayı, kariyer ve başarı odaklı bir yaşamı ifade eder.",
                "Boş şehir: Terk edilmişlik hissini, yalnızlığı ve kıyamet sonrası (radikal değişim) atmosferini gösterir."
            ],
            cta: "Bu kalabalıkta yeriniz neresi? Dream Boat ile şehirdeki yolunuzu çizin."
        }
    },
    {
        slug: 'street',
        data: {
            localizedName: "Sokak / Cadde",
            title: "Rüyada Sokak Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada sokak görmek, yaşam yolunu, seçenekleri, kamusal alanı ve yön arayışını simgeler.",
            introduction: "Hayatın damarları olan Sokaklar, rüyalarda 'ilerleyiş yönünü' ve 'seçimleri' simgeler. 'Sokağa çıkmak', evin (özeli) güvenliğinden çıkıp, olasılıkların ve risklerin olduğu dünyaya adım atmaktır.",
            symbolism: "Dar sokak, kısıtlı imkanları veya baskıyı; geniş cadde, ferahlığı ve başarı yolunu anlatır. Çıkmaz sokak, bir çözümün olmadığını ve geri dönmek gerektiğini gösterir. Sokak lambası, rehberliği; karanlık sokak, bilinmezliği ve tehlikeyi simgeler.",
            cosmicAnalysis: "Merkür (yollar/yolcular) ve İkizler burcu (hareket) etkisindedir. Yeni Ay'da yeni bir sokağa girmek, hayatınızda yeni bir sayfa açmaktır.",
            commonScenarios: [
                "Sokakta yürümek: Hayatın akışına karışmayı, gözlem yapmayı ve yol almayı simgeler.",
                "Sokak kavgası: Çevresel gerginlikleri, toplumsal huzursuzluğu veya bastırılmış öfkenin dışa vurumunu gösterir.",
                "Tanıdık sokak: Geçmişe, çocukluğa veya güvenli hissettiğiniz anılara dönüşü ifade eder."
            ],
            cta: "Hangi sokağa sapacaksınız? Dream Boat ile doğru yolu bulun."
        }
    },
    {
        slug: 'road',
        data: {
            localizedName: "Yol",
            title: "Rüyada Yol Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada yol görmek, kaderi, geleceği, yöntemi ve yaşam serüvenini simgeler.",
            introduction: "Rüyaların en evrensel sembolü Yol, 'Tao'dur; yani 'Hayatın Kendisi'. Rüyada görülen yolun durumu (taşlı, düz, virajlı), yaşam yolculuğunuzun mevcut kalitesini ve gelecekte sizi nelerin beklediğini anlatır.",
            symbolism: "Uzun yol sabrı; virajlı yol beklenmedik değişimleri simgeler. Yokuş yukarı çıkmak zorlukla gelen başarıyı; yokuş aşağı inmek kolaylığı veya statü kaybını anlatır. Yol ayrımı, kritik bir kararı (özgür iradeyi) temsil eder. Yol çalışmesi (tadilat), kişinin kendini geliştirme sürecidir.",
            cosmicAnalysis: "Merkür (yolculuk) ve Jüpiter (uzak mesafeler) etkisindedir. Yay burcu (keşif) enerjisi taşır. Büyüyen Ay'da yola çıkmak, macera ve büyüme arzusudur.",
            commonScenarios: [
                "Yolunu kaybetmek: Hayat amacından sapmayı, kafası karışıklığı ve manevi rehberlik ihtiyacını gösterir.",
                "Otoban: Hızlı ilerlemeyi, kariyer odaklılığı ama detayları kaçırmayı simgeler.",
                "Toprak yol: Doğallığı, samimiyeti ama konfor eksikliğini ve zorluğu ifade eder."
            ],
            cta: "Yolun sonu nereye varıyor? Dream Boat uygulamasını indirin ve kaderinizi çizin."
        }
    },
    {
        slug: 'corridor',
        data: {
            localizedName: "Koridor",
            title: "Rüyada Koridor Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada koridor görmek, geçiş sürecini, arafı, seçenekleri ve bilinmeyene gidişi simgeler.",
            introduction: "Odaları birbirine bağlayan dar geçit Koridor, rüyalarda 'Araf'ı ve 'Geçiş Süreci'ni simgeler. Ne oradasınızdır ne de burada; koridor, iki durum arasındaki bekleme ve ilerleme alanıdır.",
            symbolism: "Uzun koridor, sabır gerektiren bir süreci veya bürokrasiyi anlatır. Kapılarla dolu koridor, hayatın sunduğu seçenekleri ve fırsatları simgeler. Karanlık koridor, geleceğe dair belirsizliği ve korkuyu; sonu ışıklı koridor (tünel gibi), umudu ve kurtuluşu gösterir.",
            cosmicAnalysis: "Satürn (zaman/kısıtlama) ve Merkür (bağlantı) etkisindedir. Yeni Ay döneminde koridor, doğum sancısını veya değişimin eşiğinde olmayı simgeler.",
            commonScenarios: [
                "Koridorda koşmak: Bir fırsatı kaçırma korkusunu veya çıkışa ulaşma telaşını simgeler.",
                "Hastane koridoru: Şifa arayışını, endişeli bekleyişi ve yaşam-ölüm arasındaki ince çizgiyi gösterir.",
                "Okul koridoru: Öğrenme sürecini, sosyal baskıyı ve geçmişteki sınavları hatırlatır."
            ],
            cta: "Hangi kapıyı açacaksınız? Dream Boat ile geçiş sürecinizi yönetin."
        }
    }
];

symbols.forEach(item => {
    const filePath = path.join(outputDir, `${item.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(item.data, null, 2));
    console.log(`Generated: ${item.slug}.json`);
});
