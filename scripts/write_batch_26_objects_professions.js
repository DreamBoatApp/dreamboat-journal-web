const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../content/tr/meanings');

const symbols = [
    // OBJECTS & HOUSEHOLD (16 Items)
    {
        slug: 'chair',
        data: {
            localizedName: "Sandalye",
            title: "Rüyada Sandalye Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada sandalye görmek, statüyü, dinlenmeyi, beklemeyi ve hayattaki yerinizi simgeler.",
            introduction: "İnsanın durup soluklandığı yer olan Sandalye, rüyalarda 'statü'nün ve 'sabitliğin' sembolüdür. Bir sandalyeye oturmak, hayatta bir yer edinmeyi, bir makama gelmeyi veya olayların akışını bir süre durdurup gözlemlemeyi ifade eder.",
            symbolism: "Sandalye, tahtın mütevazı bir versiyonudur; bu nedenle otoriteyi ve gücü elinde tutmayı simgeler. Boş sandalye, bir kaybı, yokluğu veya beklenen bir misafiri (fırsatı) anlatır. Kırık sandalye, güvenilmez bir desteği veya sarsılan statüyü işaret eder. Sallanan sandalye, huzursuzluğu veya geçmiş-gelecek arasındaki kararsızlığı gösterir.",
            cosmicAnalysis: "Satürn (sabitlik/zaman) ve Jüpiter (makam) etkisindedir. Oturarak yönetmeyi ve sabrı simgeler. Küçülen Ay'da, dinlenme ve enerjinizi toplama zamanıdır.",
            commonScenarios: [
                "Sandalyeye oturmak: Bir işi veya durumu kontrol altına aldığınızı, güvende hissettiğinizi gösterir.",
                "Sandalyeden düşmek: Makam kaybını, itibar zedelenmesini veya ani bir başarısızlığı simgeler.",
                "Sandalye taşımak: Yükümlülüklerinizi sırtlandığınızı veya statünüzü korumak için çaba harcadığınızı ifade eder."
            ],
            cta: "Hayattaki yeriniz sağlam mı? Dream Boat ile statünüzü ve duruşunuzu analiz edin."
        }
    },
    {
        slug: 'table',
        data: {
            localizedName: "Masa",
            title: "Rüyada Masa Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada masa görmek, birliği, kararları, sosyal bağları ve çalışmayı simgeler.",
            introduction: "İnsanları bir araya getiren veya üzerinde iş görülen Masa, rüyalarda 'ortak zemin' ve 'paylaşım' sembolüdür. Yemek masası aileyi ve rızkı; çalışma masası ise üretimi ve planları temsil eder. Masa, hayatın sunulduğu bir sahnedir.",
            symbolism: "Masa, dört ayağıyla (genellikle) istikrarı, dengeyi ve maddi dünyayı (dört element) simgeler. 'Masaya yatırmak' deyimi, bir konuyu çözüme kavuşturma isteğidir. Donatılmış masa bereketi; boş veya kirli masa ise iletişimsizliği ve maddi sıkıntıyı anlatır. Yuvarlak masa, eşitliği ve sonsuz döngüyü ifade eder.",
            cosmicAnalysis: "Jüpiter (sosyalleşme/bolluk) ve Merkür (çalışma/anlaşma) etkisindedir. Dolunay'da kurulan sofra, birleşmeyi, kutlamayı veya bir anlaşmanın tamamlanmasını müjdeler.",
            commonScenarios: [
                "Masa toplamak: Bir dönemin veya işin bittiğini, sonuçları değerlendirme vaktini gösterir.",
                "Masanın kırılması: Aile birliğinin veya bir iş ortaklığının bozulmasını, zeminin kaymasını simgeler.",
                "Masa başında toplantı: Önemli kararlar arifesinde olduğunuzu ve fikir alışverişine ihtiyaç duyduğunuzu belirtir."
            ],
            cta: "Masanızda neleri paylaşıyorsunuz? Dream Boat uygulamasını indirin ve hayatınızdaki dengeleri keşfedin."
        }
    },
    {
        slug: 'bed',
        data: {
            localizedName: "Yatak",
            title: "Rüyada Yatak Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada yatak görmek, mahremiyeti, cinselliği, dinlenmeyi ve bilinçdışına geçişi simgeler.",
            introduction: "Günün yorgunluğunun atıldığı ve rüyaların görüldüğü yer olan Yatak, 'mahremiyet'in, 'cinselliğin' ve 'bilinçdışının' en güçlü sembolüdür. O, doğumun, ölümün ve rüyanın gerçekleştiği kutsal bir kozadır.",
            symbolism: "Yatak, güvenlik ihtiyacını ve savunmasızlığı temsil eder. Dağınık yatak, huzursuz bir zihni veya karmaşık bir özel hayatı; temiz ve yapılı yatak ise iç huzuru ve düzenli bir ilişkiyi anlatır. Yabancı bir yatak, yeni maceraları veya güvensizliği simgeleyebilir.",
            cosmicAnalysis: "Ay (uyku/rüya) ve Venüs (cinsellik/konfor) yönetimindedir. Büyüyen Ay'da, romantik ilişkilerde yakınlaşmayı; Küçülen Ay'da ise içe dönme ve dinlenme ihtiyacını işaret eder.",
            commonScenarios: [
                "Yataktan düşmek: Ani bir uyanışı, gerçeklerle sert bir yüzleşmeyi veya konfor alanının bozulmasını simgeler.",
                "Yatakta biriyle olmak: O kişiyle ruhsal veya bedensel bir bağ kurma arzusunu (veya korkusunu) gösterir.",
                "Yatak değiştirmek: Hayatınızda köklü bir değişikliği, taşınmayı veya yeni bir ilişkiyi işaret eder."
            ],
            cta: "Ruhunuz nerede dinleniyor? Dream Boat ile en mahrem mesajlarınızı çözün."
        }
    },
    {
        slug: 'pillow',
        data: {
            localizedName: "Yastık",
            title: "Rüyada Yastık Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada yastık görmek, huzuru, desteği, konforu ve gizli duyguları simgeler.",
            introduction: "Başımızı koyduğumuz ve en gizli düşüncelerimizi fısıldadığımız Yastık, rüyalarda 'destek' ve 'teselli' arayışını simgeler. O, dış dünyanın sertliğine karşı aradığımız yumuşak bir sığınaktır.",
            symbolism: "Yastık, zihinsel dinlenmeyi temsil eder. Yumuşak yastık konforu ve huzuru; sert yastık ise zorlu düşünceleri veya huzursuzluğu anlatır. Yastık kılıfı değiştirmek, bakış açınızı temizlemeyi ve yenilenmeyi gösterir. Yastığa sarılmak, yalnızlık hissini ve şefkat ihtiyacını vurgular.",
            cosmicAnalysis: "Ay enerjisi taşır. Güven duygusuyla ilgilidir. Yeni Ay'da temiz yastık görmek, zihninizi boşaltıp yeni başlangıçlara hazır olduğunuzu müjdeler.",
            commonScenarios: [
                "Yastık savaşı: Gerginliği oyunla veya hafif bir çatışmayla atma isteğini; çocuksu neşeyi simgeler.",
                "Yırtık yastık: Güvendiğiniz bir desteğin (kişinin) sizi hayal kırıklığına uğrattığını veya sırlarınızın döküldüğünü gösterir.",
                "Yastık altı yapmak: Değerli bir şeyi (parayı veya bilgiyi) saklama ve geleceği garantiye alma güdüsünü ifade eder."
            ],
            cta: "Başınızı neye yaslıyorsunuz? Dream Boat uygulamasını indirin ve içsel huzurunuzu bulun."
        }
    },
    {
        slug: 'blanket',
        data: {
            localizedName: "Battaniye / Yorgan",
            title: "Rüyada Battaniye Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada battaniye görmek, sıcaklığı, korumayı, gizlenmeyi ve güvenliği simgeler.",
            introduction: "Bizi saran ve dış dünyadan izole eden Battaniye, rüyalarda 'korunma' ve 'sıcaklık' ihtiyacının sembolüdür. Ana rahmini anımsatan bu örtü, hem bir sığınak hem de gerçeklerden kaçış aracı olabilir.",
            symbolism: "Battaniye altına saklanmak, korkuyu veya sorumluluktan kaçmayı; birinin üstünü örtmek, şefkati ve koruyuculuğu simgeler. Kirli battaniye, hastalıklı bir durumu veya sizi boğan bir ilişkiyi; renkli battaniye ise neşeli ve güvenli bir dönemi anlatır.",
            cosmicAnalysis: "Satürn (sınır/koruma) ve Ay (güvenlik) etkisindedir. Kış dönemi simgesidir. Dolunay'da, sakladığınız bir şeyin artık ortaya çıkması gerektiğini veya aşırı korumacı tavrınızı bırakmanız gerektiğini hatırlatır.",
            commonScenarios: [
                "Battaniyenin kısa gelmesi: Mevcut imkanlarınızın veya savunmanızın yetersiz kaldığını; kendinizi açıkta hissettiğinizi gösterir.",
                "Battaniye örgülemek/dikmek: Kendi güvenli alanınızı yaratmayı ve sabırla bir ilişkiyi/yuvası kurmayı simgeler.",
                "Battaniye yıkamak: Geçmişin tozunu ve yükünü üzerinden atarak arınmayı ifade eder."
            ],
            cta: "Neyin üzerini örtüyorsunuz? Dream Boat ile saklı gerçeklerinizi keşfedin."
        }
    },
    {
        slug: 'curtain',
        data: {
            localizedName: "Perde",
            title: "Rüyada Perde Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada perde görmek, gizliliği, sırları, dış dünyayla aradaki engeli ve sahneyi simgeler.",
            introduction: "İçerisi ile dışarısı arasındaki sınır olan Perde, rüyalarda 'mahremiyet' ve 'gizem' sembolüdür. Perdenin açılması gerçeği görmeyi; kapanması ise bir dönemin bitişini veya bir şeyi gizleme arzusunu anlatır.",
            symbolism: "Perde, tiyatro sahnesini de çağrıştırır; hayatınızdaki bir rolün veya olayın bitişini/başlangıcını simgeler. Kalın perdeler, dış dünyadan kopuşu ve depresyonu; tül perdeler ise şeffaflığı ve hafifliği gösterir. Yırtık perde, mahremiyetin ihlalini ifade eder.",
            cosmicAnalysis: "Neptün (örtü/sis) ve Ay (gece/gizlilik) etkisindedir. Yeni Ay'da perdenin açılması, hayatınıza yeni bir ışığın (bilginin) gireceğini müjdeler.",
            commonScenarios: [
                "Perdeyi açmak: Ufkunuzu genişletmeyi, gerçeklerle yüzleşmeyi ve dış dünyaya açılmayı simgeler.",
                "Perde takmak: Hanenizi veya iç dünyanızı meraklı gözlerden koruma, sınır çizme ihtiyacını gösterir.",
                "Siyah perde: Yas sürecini, üzüntüyü veya karamsar bir bakış açısını işaret eder."
            ],
            cta: "Sizin perdenizin arkasında ne var? Dream Boat uygulamasını indirin ve gizemi çözün."
        }
    },
    {
        slug: 'carpet',
        data: {
            localizedName: "Halı",
            title: "Rüyada Halı Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada halı görmek, konforu, zenginliği, temeli ve bazen örtbas edilenleri simgeler.",
            introduction: "Zemini kaplayan ve mekanı ısıtan Halı, rüyalarda 'maddi konfor' ve 'temel güvenlik' sembolüdür. Desenleri hayatın karmaşıklığını, dokusu ise yaşam standardını yansıtır. Aynı zamanda 'halı altına süpürmek' deyimiyle, sorunları görmezden gelmeyi de anlatır.",
            symbolism: "Uçan halı, hayal gücünü ve fiziksel sınırlardan özgürleşmeyi simgeler. Yeni halı, zenginliği ve statü artışını; eski halı ise ailevi kökleri ve gelenekleri anlatır. Halı silkelemek, birikmiş sorunları veya tozlu (eski) meseleleri temizlemektir.",
            cosmicAnalysis: "Venüs (dekorasyon/konfor) ve Toprak elementiyle ilişkilidir. Büyüyen Ay'da, haneye girecek bereketi ve maddi kazancı işaret eder.",
            commonScenarios: [
                "Halı sermek: Misafir (fırsat) için hazırlık yapmayı veya hayatınıza yeni bir zemin/düzen getirmeyi simgeler.",
                "Halıya basmak: Güvenli bir alanda olduğunuzu, ayağınızın yere sağlam bastığını hissettirir.",
                "Halıda leke: İtibarınızı zedeleyecek küçük bir hatayı veya aile içindeki bir huzursuzluğu gösterir."
            ],
            cta: "Neleri halı altına süpürdünüz? Dream Boat ile bilinçdışınızı temizleyin."
        }
    },
    {
        slug: 'mirror',
        data: {
            localizedName: "Ayna",
            title: "Rüyada Ayna Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada ayna görmek, özfarkındalığı, yüzleşmeyi, egoyu ve gerçeğin yansımasını simgeler.",
            introduction: "Gerçeği olduğu gibi (veya bazen çarpıtarak) yansıtan Ayna, rüyalarda 'Benlik' ile karşılaşma anıdır. O, ruhun camdan gözüdür; bedenimizi değil, iç dünyamızın durumunu, vicdanımızı ve kimliğimizi yansıtır.",
            symbolism: "Ayna, narsisizm (ego) kadar, derin bir içgörü aracıdır da. Kırık ayna, uğursuzluktan ziyade, parçalanmış bir benlik algısını veya bozuk bir ilişkiyi simgeler. Aynada kendini farklı görmek, kimlik karmaşasını veya dönüşümü anlatır. Aynanın yokluğu, kendini tanımaktan kaçınmaktır.",
            cosmicAnalysis: "Ay (yansıma) ve Venüs (güzellik) etkisindedir. Dolunay, kozmik bir aynadır; rüyada ayna görmek, Dolunay enerjisiyle tam bir yüzleşme ve aydınlanma yaşamayı simgeler.",
            commonScenarios: [
                "Aynaya bakmak: Kendi hatalarınızla veya güzelliğinizle yüzleşmeyi; 'ben kimim?' sorusunu sormayı ifade eder.",
                "Buğulu ayna: Kafanızın karışık olduğunu, gerçeği net göremediğinizi veya kendinizden sakladığınız şüpheleri gösterir.",
                "Aynanın içinden geçmek: Alice Harikalar Diyarında gibi, bilinçdışının derinliklerine, başka bir boyuta geçişi simgeler."
            ],
            cta: "Aynada kimi görüyorsunuz? Dream Boat uygulasını indirin ve gerçek benliğinizle tanışın."
        }
    },
    {
        slug: 'clock',
        data: {
            localizedName: "Saat",
            title: "Rüyada Saat Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada saat görmek, zamanı, ömrü, aciliyeti ve evrensel düzeni simgeler.",
            introduction: "Zamanın acımasız ya da düzenleyici ritmi olan Saat, rüyalarda 'yaşam süresini' ve 'fırsat anını' simgeler. Tik taklar, kalbin atışları gibi, hayatın geçip gittiğini veya önemli bir anın yaklaştığını hatırlatır.",
            symbolism: "Saat, kozmik düzen (Kronos) ve disiplindir. Saatin durması, bir dönemin bitişini veya zamanın donduğu travmatik bir anı (veya ölümü) simgeleyebilir. Hızlı ilerleyen saat, telaşı ve yaşlanma korkusunu; gerye giden saat, geçmişi düzeltme arzusunu anlatır. Alarm sesi, uyanış çağrısıdır.",
            cosmicAnalysis: "Satürn (Zamanın Efendisi) ile doğrudan ilişkilidir. Karma ve sorumlulukları hatırlatır. Yeni Ay'da saat kurmak, yeni bir dönemin başlangıcını planlamaktır.",
            commonScenarios: [
                "Saat almak: Zamanınızı daha iyi yönetme kararı aldığınızı veya bir randevuya/fırsata önem verdiğinizi gösterir.",
                "Kol saati: Kişisel sorumluluklarınızı ve zamanın kontrolünün sizin elinizde olduğunu hissetmeyi simgeler.",
                "Duvar saati: Ailevi veya toplumsal zamanı; herkesi ilgilendiren bir bekleyişi ifade eder."
            ],
            cta: "Zaman sizin için nasıl akıyor? Dream Boat ile hayatınızın ritmini yakalayın."
        }
    },
    {
        slug: 'lamp',
        data: {
            localizedName: "Lamba / Işık",
            title: "Rüyada Lamba Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada lamba görmek, aydınlanmayı, umudu, rehberliği ve fikirleri simgeler.",
            introduction: "Karanlığı delen ışık kaynağı Lamba, rüyalarda 'zihinsel aydınlanma' ve 'umut' sembolüdür. Bilinmezliğin (karanlığın) ortasında parlayan lamba, bir fikrin doğuşunu veya çıkış yolunun görünmesini müjdeler.",
            symbolism: "Lamba yakmak, bilinçli bir farkındalık yaratmak ve sorunu çözmektir. Sönen lamba, umutsuzluğu, başarısızlığı veya enerjinin tükenmesini anlatır. Gaz lambası veya kandil, geçmişten gelen bilgeliği ve manevi rehberliği simgeler. Abajur, ışığı yumuşatmak; gerçeği daha nazikçe kabullenmektir.",
            cosmicAnalysis: "Güneş (ışık) ve Uranüs (elektrik/fikir) etkisindedir. Yeni Ay'da yanan lamba, ani bir ilhamı ve yaratıcı bir fikri işaret eder.",
            commonScenarios: [
                "Lamba değiştirmek: Bakış açınızı değiştirmeyi, olaylara yeni bir ışık tutmayı simgeler.",
                "Kırık lamba: Aydınlanmanızı engelleyen bir durumu veya hayal kırıklığını gösterir.",
                "Lambayı kapatmak: Bir konuyu kapatmayı, dinlenmeye çekilmeyi veya görmezden gelmeyi ifade eder."
            ],
            cta: "Yolunuzu ne aydınlatıyor? Dream Boat uygulamasını indirin ve içsel ışığınızı yakın."
        }
    },
    {
        slug: 'candle',
        data: {
            localizedName: "Mum",
            title: "Rüyada Mum Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada mum görmek, ruhsallığı, dileği, romantizmi ve yaşam enerjisini simgeler.",
            introduction: "Eriyerek ışık veren fedakar Mum, rüyalarda 'ruhsal adanmışlığı' ve 'kutsal dilekleri' simgeler. Titrek alevi, insan ruhunun kırılgan ama inatçı yaşam enerjisine benzer; karanlıkta küçük de olsa bir umudun varlığını kanıtlar.",
            symbolism: "Mum, dua ve meditasyon aracıdır. Mum yakmak, bir niyet tutmak veya ölmüşleri anmaktır. Mumun sönmesi, bir umudun bitişi veya yaşam enerjisinin azalmasıdır. Erimekte olan mum, zamanın geçişini ve ömrün (veya sabrın) tükenişini hatırlatır.",
            cosmicAnalysis: "Ateş elementi ve Güneş (küçük güneş) sembolüdür. Manevi uyanışla ilgilidir. Dolunay'da mum yakmak, ritüelistik bir tamamlanmayı ve niyetin gücünü simgeler.",
            commonScenarios: [
                "Mum üflemek: Bir dileğin gerçekleşmesini veya bir dönemi kendi iradenizle sonlandırmayı (doğum günü gibi) simgeler.",
                "Çok sayıda mum: Büyük bir kutlamayı, ayini veya kolektif bir umudu/anmayı gösterir.",
                "Mum ışığında oturmak: Romantizmi, içe dönüşü ve huzurlu bir bekleyişi ifade eder."
            ],
            cta: "Dileğiniz ne? Dream Boat ile rüyalarınızdaki ışığı takip edin."
        }
    },
    {
        slug: 'vase',
        data: {
            localizedName: "Vazo",
            title: "Rüyada Vazo Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada vazo görmek, dişil enerjiyi, estetiği, duygusal kapasiteyi ve kırılganlığı simgeler.",
            introduction: "Güzelliği taşıyan ve sergileyen Vazo, rüyalarda 'Dişil Enerji'nin ve 'duygusal kapasite'nin sembolüdür. Boş vazo bir potansiyeli; çiçekle dolu vazo ise ruhun veya aşkın meyve vermesini, yaşamın güzelleşmesini anlatır.",
            symbolism: "Vazo, Rahim arketipini (kap/tasıyıcı) temsil eder. Şekli ve durumu, rüya sahibinin ruh halini yansıtır. Kırık vazo, kalp kırıklığını, geri dönüşü olmayan bir hasarı veya bekaretin kaybını simgeleyebilir. Kristal vazo, şeffaflığı ve değeri; seramik vazo ise dayanıklılığı ve sanatı anlatır.",
            cosmicAnalysis: "Venüs (güzellik/sanat) ve Ay (kap/rahim) etkisindedir. Büyüyen Ay'da vazoya çiçek koymak, sevginin ve yaratıcılığın yeşermesini simgeler.",
            commonScenarios: [
                "Vazo kırmak: İstenmeyen bir kazayı, bir ilişkinin bitişini veya dikkatsizlikle gelen pişmanlığı gösterir.",
                "Vazo hediye almak: Birinin size değer verdiğini, duygularını sunduğunu simgeler.",
                "Vazodaki suyun taşması: Duyguların kontrol edilemez hale gelmesini veya bolluğu (aşırı) ifade eder."
            ],
            cta: "Ruhunuzun kabı neyle dolu? Dream Boat uygulamasını indirin ve duygusal kapasitenizi keşfedin."
        }
    },
    {
        slug: 'bowl',
        data: {
            localizedName: "Kase",
            title: "Rüyada Kase Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada kase görmek, almayı, kabul etmeyi, bereketi ve boşluğu simgeler.",
            introduction: "Ellerin avuç içi gibi çukur ve alıcı olan Kase, rüyalarda 'kabul etme' ve 'beslenme' sembolüdür. Dilenci kasesi tevazuyu, çorba kasesi bereketi simgeler. O, evrenin sunduklarını almaya hazır olmanın işaretidir.",
            symbolism: "Kase, boşluk (potansiyel) ve doluluk (tatmin) ikilemini taşır. Rüyada dolu kase, zenginliği ve doyumu; boş kase, ihtiyaç halini ve beklentiyi anlatır. Kaseyi kırmak, kısmeti reddetmek veya elindeki imkanı kaybetmektir.",
            cosmicAnalysis: "Ay (hilal şekli/kapsayıcılık) ile bağlantılıdır. Dişil bir semboldür. Yeni Ay'da boş bir kase, evrenden yeni dilekler istemeye hazır olduğunuzu gösterir.",
            commonScenarios: [
                "Kase yıkamak: Yeni rızıklara yer açmak için arınmayı ve hazırlığı simgeler.",
                "Altın kase: Manevi veya maddi çok büyük bir ödülü, kutsal kase (Grail) arketipini çağrıştırır.",
                "Kase sunmak: Cömertliği, paylaşımı ve yardımseverliği ifade eder."
            ],
            cta: "Kasenizi neyle doldurmak istersiniz? Dream Boat ile bereket kapısını aralayın."
        }
    },
    {
        slug: 'spoon',
        data: {
            localizedName: "Kaşık",
            title: "Rüyada Kaşık Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada kaşık görmek, kısmeti, beslenmeyi, dozajı ve şifayı simgeler.",
            introduction: "Besine ulaşma ve onu ölçme aracı olan Kaşık, rüyalarda 'kısmet' ve 'payına düşeni alma' sembolüdür. 'Kaşık düşmanı' veya 'gümüş kaşıkla doğmak' gibi deyimlerle, kaşık kaderi ve rızkı temsil eder.",
            symbolism: "Büyük kepçe bolluğu; tatlı kaşığı ise küçük ama keyifli detayları anlatır. Kaşık bükmek (Matrix), zihinsel gücü ve gerçekliği değiştirme arzusunu simgeler. Paslı kaşık, eski veya haram malı; tahta kaşık ise doğallığı ve emeği gösterir.",
            cosmicAnalysis: "Jüpiter (bolluk) ve Ay (beslenme) etkisindedir. Dolunay'da kaşık, rızkın artışını ve sofranın bereketini simgeler.",
            commonScenarios: [
                "Kaşık kaşık yemek: Hayatın tadını iştahla çıkarmayı, sağlığı ve bolluğu gösterir.",
                "Kaşık yıkamak: Temiz bir kazancı ve dürüstlüğü simgeler.",
                "Kaşık düşürmek: Beklenmedik bir misafiri veya küçük bir kısmet kaybını işaret eder."
            ],
            cta: "Hayat kaşığınız ne kadar dolu? Dream Boat uygulamasını indirin ve kısmetinizi görün."
        }
    },
    {
        slug: 'fork',
        data: {
            localizedName: "Çatal",
            title: "Rüyada Çatal Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada çatal görmek, seçimi, ayrımı, eleştirel düşünceyi ve bazen çatışmayı simgeler.",
            introduction: "Uçlarıyla batan ve ayıran Çatal, rüyalarda 'seçicilik' ve 'analiz' sembolüdür. Yemeği parçalara ayırması gibi, zihnin de konuları irdeleme ve detaylara inme yeteneğini temsil eder. Bazen de yol ayrımlarını (çatallanan yollar) işaret eder.",
            symbolism: "Çatal, Neptün'ün mızrağını (üç dişli) veya Şeytan'ın asasını andırabilir; bu da güç veya ayartma anlamına gelebilir. Çatal batırmak, agresifliği veya bir gerçeği zorla kabul ettirmeyi anlatır. Dört dişli çatal, dengeyi ve düzeni; iki dişli çatal, ikilemi simgeler.",
            cosmicAnalysis: "Mars (keskinlik/batma) ve Merkür (ayrım/seçim) etkisindedir. Küçülen Ay'da, hayatınızdaki fazlalıkları ayıklama ve detoks zamanıdır.",
            commonScenarios: [
                "Çatalla yemek: Seçici davrandığınızı, her önünüze geleni kabul etmediğinizi, standartlarınızın yüksek olduğunu gösterir.",
                "Çatalın düşmesi: Bir tartışmayı, fikir ayrılığını veya beklenmedik bir (erkek) misafiri simgeler.",
                "Çatal bıçak sesi: Sosyal bir ortamı, gergin bir bekleyişi veya dedikoduyu ifade edebilir."
            ],
            cta: "Hangi yola sapacaksınız? Dream Boat ile hayatınızdaki yol ayrımlarını analiz edin."
        }
    },
    {
        slug: 'knife',
        data: {
            localizedName: "Bıçak",
            title: "Rüyada Bıçak Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada bıçak görmek, ayrılığı, keskin zekayı, tehlikeyi ve radikal kararları simgeler.",
            introduction: "Keskin ve soğuk çeliğiyle Bıçak, rüyalarda 'kesip atma' ve 'radikal değişim' sembolüdür. O, bağları koparan, sorunu kökünden çözen eril bir güçtür. Hem bir saldırı silahı hem de bir mutfak (hazırlık) aracı olabilir.",
            symbolism: "Bıçak, Mars enerjisiyle doludur; agresyon, cesaret ve cerrahi müdahale (şifa için kesme) demektir. Bıçaklanmak, ihaneti veya acı verici bir sözü; bıçak bilemek, hazırlığı ve savunmayı simgeler. Kör bıçak, etkisiz çabayı ve boşa giden enerjiyi gösterir.",
            cosmicAnalysis: "Mars (kılıç/savaş) yönetimindedir. Dolunay'da bıçak görmek, bitmesi gereken bir ilişkinin veya durumun nihayet sonlanacağını (kesileceğini) işaret eder.",
            commonScenarios: [
                "Bıçak tutmak: Gücü ve kontrolü elinizde hissettiğinizi, kendinizi savunmaya hazır olduğunuzu gösterir.",
                "Bıçakla bir şey kesmek: Paylaşımı (ekmeği bölmek) veya bir sorunu parçalara ayırarak çözmeyi simgeler.",
                "Bıçak hediye almak: Bir ortaklığın bozulmasını veya keskin bir eleştiriyi ifade edebilir."
            ],
            cta: "Hayatınızda neyi kesip atmanız gerekiyor? Dream Boat uygulamasını indirin ve cesur kararlar alın."
        }
    },

    // PROFESSIONS & PEOPLE (12 Items)
    {
        slug: 'teacher',
        data: {
            localizedName: "Öğretmen",
            title: "Rüyada Öğretmen Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada öğretmen görmek, rehberliği, öğrenmeyi, otoriteyi ve hayat derslerini simgeler.",
            introduction: "Bilginin ve otoritenin figürü Öğretmen, rüyalarda 'rehberlik' ve 'tekamül' arayışını simgeler. O, bilinçdışının bilge yönüdür; bize henüz öğrenmediğimiz bir dersi hatırlatmak veya yol göstermek için oradadır.",
            symbolism: "Rüyada eski öğretmeni görmek, geçmişten gelen bir bilginin veya tecrübenin şimdiki soruna çözüm olacağını gösterir. Öğretmenin kızması, vicdan azabını veya bir hatayı düzeltme uyarısını; sevmesi ise doğru yolda olduğunuzun onayını simgeler. Öğretmen olmak, bilgeliği paylaşma ve liderlik etme arzusudur.",
            cosmicAnalysis: "Jüpiter (Guru/öğretmen) ve Satürn (disiplin) etkisindedir. Büyüyen Ay'da, yeni bir eğitime başlamak veya mentorluk almak için harika bir zamandır.",
            commonScenarios: [
                "Ders dinlemek: Hayatın size sunduğu mesajlara açık olduğunuzu, öğrenci modunda (alçakgönüllü) kaldığınızı gösterir.",
                "Öğretmenle tartışmak: Otoriteyle veya yerleşik kurallarla çatışmayı; kendi doğrunuzu arama sürecini simgeler.",
                "Okul görmek: Hayat okulunda pişmeyi ve sınavdan geçmeyi ifade eder."
            ],
            cta: "Hangi dersi öğrenmeniz gerekiyor? Dream Boat ile hayatın sınavlarına hazırlanın."
        }
    },
    {
        slug: 'police',
        data: {
            localizedName: "Polis",
            title: "Rüyada Polis Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada polis görmek, vicdanı, kuralları, cezayı ve düzeni simgeler.",
            introduction: "Kanunun ve düzenin bekçisi Polis, rüyalarda 'Süper Ego'nun (vicdanın) somutlaşmış halidir. O, içsel yasalarımızı, suçluluk duygumuzu veya hayattaki sınırları denetleyen bir otorite figürüdür.",
            symbolism: "Polis, kontrol ve disiplindir. Polisten kaçmak, sorumluluktan veya vicdan azabından kaçışı; polis çağırmak, yardım ve adalet arayışını simgeler. Polis tarafından tutuklanmak, kısıtlanmayı veya bir hatanın bedelini ödemeyi (arınmayı) anlatır.",
            cosmicAnalysis: "Satürn (yasa/sınır) ve Mars (güç kullanımı) etkisindedir. Dolunay'da polis görmek, gizli bir suçun veya hatanın ortaya çıkmasıyla gelen yüzleşmeyi simgeler.",
            commonScenarios: [
                "Polis kontrolü: Kendinizi sorguladığınızı, hayatınızın gidişatını (ehliyet/ruhsat) gözden geçirdiğinizi gösterir.",
                "Sivil polis: Beklenmedik bir yerden gelen denetimi veya gizli bir düşmanlığı/dostluğu ifade edebilir.",
                "Polis olmak: Hayatınızda düzeni sağlama, başkalarını koruma veya kontrol etme gücünü elinize almayı simgeler."
            ],
            cta: "Vicdanınız sizi neden sorguluyor? Dream Boat uygulamasını indirin ve içsel huzuru sağlayın."
        }
    },
    {
        slug: 'soldier',
        data: {
            localizedName: "Asker",
            title: "Rüyada Asker Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada asker görmek, disiplini, mücadeleyi, görevi ve içsel savaşı simgeler.",
            introduction: "Üniforması ve disipliniyle Asker, rüyalarda 'görev bilinci' ve 'mücadele ruhunu' temsil eder. O, hayatın zorluklarına karşı savaşan, emirlere uyan ve düzeni koruyan içsel savaşçımızdır.",
            symbolism: "Asker, kolektif bir amaca hizmet etmeyi ve egoyu (bireyselliği) feda etmeyi anlatır. Savaşa giden asker, zorlu bir döneme hazırlığı; nöbet tutan asker, tetikte olmayı ve korumayı simgeler. Terhis olmak, zorlu bir görevin bitişini ve özgürlüğü müjdeler.",
            cosmicAnalysis: "Mars (savaşçı) ve Satürn (emir-komuta) yönetimindedir. Koç burcu enerjisi taşır. Büyüyen Ay'da, cesaretinizi toplayıp bir sorunun üzerine gitme zamanıdır.",
            commonScenarios: [
                "Asker uğurlamak: Bir ayrılığı, hasreti veya vatan/görev borcunu ödemeyi simgeler.",
                "Askeri birlik: Güçlü bir dayanışmayı, organize olmayı ve disiplinli çalışmayı gösterir.",
                "Yaralı asker: Mücadele ederken aldığınız darbeleri, yorgunluğu ve dinlenme ihtiyacını ifade eder."
            ],
            cta: "Hangi cephede savaşıyorsunuz? Dream Boat ile gücünüzü ve stratejinizi belirleyin."
        }
    },
    {
        slug: 'nurse',
        data: {
            localizedName: "Hemşire",
            title: "Rüyada Hemşire Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada hemşire görmek, şefkati, iyileşmeyi, bakımı ve yardımı simgeler.",
            introduction: "Şifanın şefkatli eli Hemşire, rüyalarda 'bakım verme' ve 'iyileşme sürecini' temsil eder. Doktordan farklı olarak, o teşhis koyan değil, yarayı saran ve hastanın yanında duran merhametli figürdür.",
            symbolism: "Hemşire, fedakarlık ve hizmet etme arzusudur. Beyaz üniforması, niyetteki saflığı ve hijyeni (arınmayı) simgeler. Rüyada hemşire olmak, başkalarının dertlerine derman olma isteğini; hemşire görmek ise ilgi ve bakım görme ihtiyacını, ruhsal bir nekahet dönemini anlatır.",
            cosmicAnalysis: "Ay (bakım/anne) ve Venüs (şefkat) veya Başak burcu (hizmet) etkisindedir. Küçülen Ay'da, yaralarınızı sarma ve dinlenerek iyileşme zamanıdır.",
            commonScenarios: [
                "İğne yapan hemşire: Acı verse de size iyi gelecek bir müdahaleyi veya dışarıdan gelen bir etkiyi (aşıyı) simgeler.",
                "Hemşire çağırmak: Çaresizlik anında yardım istemeyi ve destek almayı kabul etmeyi gösterir.",
                "Hastane koridoru: Bekleyişi, endişeyi ve şifa arayışındaki süreci ifade eder."
            ],
            cta: "Ruhunuzun neye ihtiyacı var? Dream Boat uygulamasını indirin ve şifalanma sürecini başlatın."
        }
    },
    {
        slug: 'dentist',
        data: {
            localizedName: "Diş Hekimi",
            title: "Rüyada Diş Hekimi Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada diş hekimi görmek, kaygıyı, iletişimi düzeltmeyi, köklü çözümleri ve acılı yüzleşmeyi simgeler.",
            introduction: "Çoğu insan için korkulu rüya olan Diş Hekimi, bilinçdışında 'zorunlu ve köklü temizliği' simgeler. Dişler iletişimi ve kendine güveni temsil ettiğinden, dişçi koltuğu sözlerimizi ve ifademizi düzelttiğimiz yerdir.",
            symbolism: "Diş çektirmek, hayatınızdan çürümüş bir parçayı (insanı veya alışkanlığı) acı da olsa söküp atmayı anlatır. Dolgu yaptırmak, bir eksiği tamamlamayı veya hatayı telafi etmeyi simgeler. Dişçinin aletleri, agresif ama gerekli bir müdahaleyi gösterir.",
            cosmicAnalysis: "Satürn (diş/kemik) ve Mars (müdahale) etkisindedir. Dolunay'da, uzun süredir ertelediğiniz bir sorunun (diş ağrısının) artık çözülmesi gerektiğini hatırlatır.",
            commonScenarios: [
                "Dişçi koltuğuna oturmak: Kontrolü başkasına bıraktığınızı ve bir sorunun çözümü için teslim olduğunuzu gösterir.",
                "Dişçiden korkmak: Yüzleşmekten kaçtığınız bir gerçeği veya acıyı simgeler.",
                "Güzel dişler: Tedavinin sonunda kazanılacak özgüveni, itibar artışını ve sağlıklı iletişimi müjdeler."
            ],
            cta: "Hangi sözler içinizi çürütüyor? Dream Boat ile iletişim sorunlarınızı kökten çözün."
        }
    },
    {
        slug: 'judge',
        data: {
            localizedName: "Hakim (Yargıç)",
            title: "Rüyada Hakim Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada hakim görmek, kararı, otoriteyi, vicdan muhasebesini ve adaleti simgeler.",
            introduction: "Kürsüdeki mutlak otorite Hakim, rüyalarda 'nihai karar' ve 'ilahi adalet' sembolüdür. O, içimizdeki en yüksek vicdanın sesidir; eylemlerimizi tartar ve hükmünü verir.",
            symbolism: "Hakim, rasyonelliği ve duygulardan arınmış adaleti temsil eder. Ceza almak, suçluluk duygusunu; beraat etmek, vicdanın rahatlamasını ve bir yükten kurtulmayı anlatır. Hakim tokmağı, bir konunun kapandığını ve geri dönüşün olmadığını gösterir. Cübbe, bilgeliği ve statüyü simgeler.",
            cosmicAnalysis: "Satürn (Karma lordu) ve Jüpiter (Yasa) etkisindedir. Terazi burcu sembolizmidir. Dolunay'da hakim görmek, beklenen bir sonucun veya davanın netleşeceğini işaret eder.",
            commonScenarios: [
                "Hakim karşısına çıkmak: Hesap verme duygusunu, bir otorite figürüyle (baba/devlet) yüzleşmeyi simgeler.",
                "Hakim olmak: Hayatınızın kontrolünü elinize almayı, başkaları hakkında hüküm verme gücünü (veya kibrini) gösterir.",
                "Mahkeme salonu: Hayatınızdaki bir çatışmanın toplumsal veya resmi boyutunu, herkesin gözü önünde yaşanmasını ifade eder."
            ],
            cta: "Kendinizi neden yargılıyorsunuz? Dream Boat uygulamasını indirin ve içsel beraatinizi kazanın."
        }
    },
    {
        slug: 'lawyer',
        data: {
            localizedName: "Avukat",
            title: "Rüyada Avukat Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada avukat görmek, savunmayı, yardımı, çatışmayı ve hak aramayı simgeler.",
            introduction: "Sizi savunan ve yol gösteren Avukat, rüyalarda 'destek arayışı' ve 'haklılığını kanıtlama' isteğinin sembolüdür. O, karmaşık yasalar (hayat kuralları) karşısında sizin sesiniz olan akılcı güçtür.",
            symbolism: "Avukat tutmak, bir sorunu tek başına çözemediğinizi ve profesyonel/akılcı bir yardıma ihtiyaç duyduğunuzu gösterir. Karşı tarafın avukatı, size yöneltilen suçlamaları veya rakiplerin hamlelerini simgeler. Cübbe giymek, resmiyeti ve bilgiyi kuşanmaktır.",
            cosmicAnalysis: "Merkür (hitabet/akıl) ve Terazi burcu (hukuk) etkisindedir. Büyüyen Ay'da, hakkınızı aramak ve sözleşmeler yapmak için uygun zamandır.",
            commonScenarios: [
                "Avukatla konuşmak: Bir çıkış yolu aradığınızı, strateji geliştirdiğinizi ve akıl danıştığınızı gösterir.",
                "Avukat olmak: Başkalarının sorunlarını çözme yeteneğinizi veya kelimeleri silah gibi kullanma becerinizi simgeler.",
                "Boşanma avukatı: İlişkilerde kopuşu, anlaşmazlığı ve duygusal bir davanın görülmesini ifade eder."
            ],
            cta: "Kimi veya neyi savunuyorsunuz? Dream Boat ile haklı davanızda güçlenin."
        }
    },
    {
        slug: 'engineer',
        data: {
            localizedName: "Mühendis",
            title: "Rüyada Mühendis Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada mühendis görmek, planlamayı, inşayı, analitik zekayı ve sorun çözmeyi simgeler.",
            introduction: "Sayıların ve yapıların ustası Mühendis, rüyalarda 'sistematik düşünce' ve 'somut çözüm' sembolüdür. Hayallerin gerçeğe dökülmesi için gereken teknik aklı ve planlamayı temsil eder.",
            symbolism: "Mühendis, karmaşık bir sorunu parçalara ayırarak çözmeyi anlatır. Proje çizmek, geleceği organize etme isteğidir. Baret takmak, iş güvenliğini ve düşünceleri korumayı simgeler. Bir makineyi tamir eden mühendis, işleyen sistemdeki (vücut veya iş) aksaklığı gidermeyi gösterir.",
            cosmicAnalysis: "Merkür (hesap/zeka) ve Satürn (yapı/inşa) veya Uranüs (teknoloji) etkisindedir. Yeni Ay'da, hayatınızı yeniden inşa etmek için mükemmel bir planlama dönemidir.",
            commonScenarios: [
                "Mühendis ile çalışmak: Duyguları bir kenara bırakıp mantıklı ve pratik adımlar atmanız gerektiğini gösterir.",
                "İnşaat sahası: Hayatınızda devam eden bir yapılanma sürecini, tozu toprağı ama sonunda çıkacak eseri simgeler.",
                "Bilgisayar mühendisi: Zihinsel kodlarınızı, iletişim ağlarını ve modern sorunları (dijital dünya) ifade eder."
            ],
            cta: "Hayatınızı nasıl inşa ediyorsunuz? Dream Boat uygulamasını indirin ve projenizi hayata geçirin."
        }
    },
    {
        slug: 'architect',
        data: {
            localizedName: "Mimar",
            title: "Rüyada Mimar Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada mimar görmek, vizyonu, yaratımı, temeli ve geleceği tasarlamayı simgeler.",
            introduction: "Boşluğa form veren sanatçı Mimar, rüyalarda 'Yaratıcı Vizyon'un ve 'Büyük Tasarımcı' arketipinin yansımasıdır. Hayatınızın temelini nasıl attığınızı ve geleceği zihninizde nasıl şekillendirdiğinizi simgeler.",
            symbolism: "Mimar, estetik ile fonksiyonun birleşimidir. Rüyada mimar, kendi kaderini çizme gücünü temsil eder. Hatalı plan, gelecekteki çöküşü; sağlam bir tasarım ise kalıcı başarıyı anlatır. Mimarın evi, sizin ruhsal barınağınızdır (bedeniniz veya yuvanız).",
            cosmicAnalysis: "Satürn (yapı) ve Venüs (estetik) dansıdır. Büyüyen Ay'da, yeni bir evin veya hayat planının temellerini atmak için ilham verici bir zamandır.",
            commonScenarios: [
                "Proje çizmek: Geleceğinizi detaylıca planladığınızı ve hayallerinizi kağıda dökme aşamasında olduğunuzu gösterir.",
                "Tarihi eser mimarisi: Geçmişten gelen değerlere, köklü inançlara ve kalıcılığa verdiğiniz önemi simgeler.",
                "Mimarın eseriyle gurur duyması: Başardığınız işlerden duyduğunuz tatmini ve ego tatminini ifade eder."
            ],
            cta: "Kendi hayatınızın mimarı mısınız? Dream Boat ile hayallerinizin planını çizin."
        }
    },
    {
        slug: 'artist',
        data: {
            localizedName: "Ressam / Sanatçı",
            title: "Rüyada Sanatçı Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada sanatçı veya ressam görmek, yaratıcılığı, duyguların ifadesini ve özgünlüğü simgeler.",
            introduction: "Ruhun renklerini tuvale döken Ressam, rüyalarda 'kendini ifade etme' ve 'yaratım' gücünün sembolüdür. O, iç dünyadaki soyut hisleri somut bir esere dönüştüren simyacıdır.",
            symbolism: "Tuval, hayatınızın boş sayfasıdır; üzerine ne çizerseniz onu yaşarsınız. Fırça, irade ve eylemdir. Renklerin karışımı, duygusal karmaşayı veya zenginliği anlatır. Sanatçı olmak, tabuları yıkmayı, özgürleşmeyi ve dünyayı kendi gözlerinizle görmeyi simgeler.",
            cosmicAnalysis: "Venüs (sanat) ve Neptün (ilham/hayal) etkisindedir. Dolunay'da sanatçı görmek, içinizdeki yaratıcı potansiyelin patlama noktasına geldiğini ve dışarı çıkmak istediğini gösterir.",
            commonScenarios: [
                "Resim yapmak: Duygularınızı dışa vurmayı, terapiyi ve içsel huzuru bulmayı simgeler.",
                "Sergi gezmek: Başkalarının fikirlerine ve bakış açılarına değer verdiğinizi, ilham aradığınızı gösterir.",
                "Tablonun yarım kalması: Tamamlanmamış bir projeyi, hevesin kaçmasını veya ertelemeyi ifade eder."
            ],
            cta: "Hayat tuvalinizi hangi renklere boyuyorsunuz? Dream Boat uygulamasını indirin ve sanatınızı konuşturun."
        }
    },
    {
        slug: 'musician',
        data: {
            localizedName: "Müzisyen",
            title: "Rüyada Müzisyen Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada müzisyen görmek, uyumu, ritmi, duygusal akışı ve yeteneği simgeler.",
            introduction: "Evrenin dilini konuşan Müzisyen, rüyalarda 'ruhsal uyum' ve 'duygu akışı'nın sembolüdür. Çaldığı enstrüman, ruh halinizin sesini; melodi ise hayatınızın mevcut ritmini yansıtır.",
            symbolism: "Müzik, duyguların en saf halidir. Akordu bozuk enstrüman, uyumsuzluğu ve sinir bozukluğunu; güzel bir melodi, huzuru ve aşkı simgeler. Orkestra, toplumsal uyumu; solo performans, bireysel yeteneği ve yalnızlığı anlatır. Müzisyen, ilham perilerinin elçisidir.",
            cosmicAnalysis: "Venüs (sanat), Neptün (müzik/ilham) ve Ay (duygu) etkisindedir. Yeni Ay'da yeni bir şarkı (ritim) duymak, hayatınıza girecek yeni bir aşkın veya heyecanın melodisidir.",
            commonScenarios: [
                "Enstrüman çalmak: Kendi duygularınızı yönetmeyi ve başkalarına aktarmayı; ustalaşmayı simgeler.",
                "Konser izlemek: Kolektif bir coşkuyu paylaşmayı, kalabalığa karışmayı ve eğlenmeyi gösterir.",
                "Şarkı söylemek: İçinizdeki sesi özgür bırakmayı, mutluluğu haykırmayı veya bir derdi ağıtla atmayı ifade eder."
            ],
            cta: "Hayatınızın ritmi nasıl? Dream Boat ile ruhunuzun şarkısını keşfedin."
        }
    },
    {
        slug: 'actor',
        data: {
            localizedName: "Oyuncu (Aktör/Aktris)",
            title: "Rüyada Oyuncu Görmek: Anlamı ve Yorumu",
            seoDescription: "Rüyada oyuncu görmek, maskeleri, rolleri, taklidi ve sahne ışıklarını simgeler.",
            introduction: "Binbir suratlı Oyuncu, rüyalarda 'Persona' (Maske) ve 'rol yapma' temasını işler. Hayat sahnesinde hangi rolü üstlendiğinizi, kendiniz mi olduğunuzu yoksa bir senaryoyu mu oynadığınızı sorgulatır.",
            symbolism: "Ünlü bir oyuncu görmek, o kişinin özelliklerini (güç, güzellik, komiklik) kendinizde aradığınızı veya idealize ettiğinizi gösterir. Rol yapmak, olduğunuzdan farklı görünme çabasını veya uyum sağlama (bukalemun) yeteneğini anlatır. Sahne, sosyal çevrenizdir; alkışlanmak onaylanma ihtiyacıdır.",
            cosmicAnalysis: "Güneş (sahne/parlama) ve Neptün (sinema/illüzyon) etkisindedir. Aslan burcu arketipidir. Dolunay'da, taktığınız maskenin düşeceğini veya gerçek kimliğinizin parlayacağını işaret edebilir.",
            commonScenarios: [
                "Film setinde olmak: Hayatınızın kurgusal, yapay olduğunu veya kontrolün yönetmende (başkasında) olduğunu hissetmeyi simgeler.",
                "Oyuncuyla konuşmak: Hayallerinize yaklaşmayı veya ünlü olma (tanınma) arzusunu gösterir.",
                "Rolünü unutmak: Toplum içinde yaşanacak bir mahcubiyeti, hazırlıksız yakalanmayı veya kimlik krizini ifade eder."
            ],
            cta: "Hangi rolü oynuyorsunuz? Dream Boat uygulamasını indirin ve maskelerinizi indirin."
        }
    }
];

symbols.forEach(item => {
    const filePath = path.join(outputDir, `${item.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(item.data, null, 2));
    console.log(`Generated: ${item.slug}.json`);
});
