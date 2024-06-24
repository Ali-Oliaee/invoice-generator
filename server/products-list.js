const productsList = [
  {
    id: "1",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/5f25267956b47517b78356231977554803d11218_1693391335.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "لامپ ال ای دی 20 وات",
    description:
      "لامپ ال ای دی 20 وات سایروکس مدل T80 با پایه E27، یک انتخاب مناسب برای روشنایی فضاهای گسترده است. ",
    price: 2000,
    count: 1,
  },
  {
    id: "2",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/8b203453ace0384d886b221d62df356b5ba0bb50_1614169370.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "پنیر خامه ای",
    description:
      "یکی از خواص پنیر این است که غنی از کلسیم، پتاسیم، فسفر، آهن و پروتئین است.",
    price: 2852,
    count: 1,
  },
  {
    id: "3",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/2b13db52a9c13444b7b3aa5cbed95076afbad10e_1657598739.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "ماکارونی زر ماکارون",
    description: "ارزش غذایی نصف لیوان ماکارونی با سمولینا ( ۵۵ گرم )",
    price: 9534,
    count: 1,
  },
  {
    id: "4",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/ed8afbda0ca3181cb3f4c8738ccef0f69e59c7df_1651902831.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "کاغذ A4",
    description:
      "کاغذ a4 کپی مکس KNS آیا به دنبال کاغذی با کیفیت بالا، قیمت مناسب و سازگار با انواع دستگاه‌های چاپ و کپی هستید؟",
    price: 1671,
    count: 1,
  },
  {
    id: "5",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/67980a963b7b65012c5d60920ff9a0796f953ba5_1713706713.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "گوشی موبایل موتورولا",
    description:
      "گوشی موبایل موتورولا مدل Moto G24 یک گوشی اقتصادی و بی‌دردسر است.",
    price: 8304,
    count: 1,
  },
  {
    id: "6",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/3dbad9f94e8174f2faef6525499da934507b130f_1687860325.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "هدفون بلوتوثی",
    description:
      "بدون هیچ تردیدی شرکت انکر یکی از برترین شرکت‌های فعال در حوزه‌ی لوازم جانبی از جمله هدفون‌ها است",
    price: 2498,
    count: 1,
  },
  {
    id: "7",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/47286adf640c82e9b4010ca2dfde20c90c7270ab_1691850443.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "لپ تاپ 15.3 اینچی",
    description:
      "لپتاپ 15.3 اینچی اپل مدل MacBook Air، یکی از لپتاپ‌های محبوب و جذاب برند اپل است",
    price: 6892,
    count: 1,
  },
  {
    id: "8",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/fb2558ec27b2888184f857aaf8cd77fd6b5efb6b_1608367006.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "کنسرو ماهی تون",
    description:
      "غذاهای دریایی جزو غذاهای محبوب در جهان هستند و طرفداران زیادی دارند. ",
    price: 7328,
    count: 1,
  },
  {
    id: "9",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/114687192.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "پاوربانک شیائومی",
    description:
      "پاور بانک Redmi دو پورت خروجی USB و یک پورت‌ ورودی نوع USB-C و MicroUSB دارد.",
    price: 4671,
    count: 1,
  },
  {
    id: "10",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/1eeed08672df0760cf633a25edb4ab186479b581_1690279593.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "پودر لباسشویی",
    description:
      " پودر لباسشویی دستی گلرنگ یکی از محصولات با کیفیت و باکیفیت در زمینه شستشوی دستی لباس‌ها و پارچه‌ها است. ا",
    price: 2903,
    count: 1,
  },
  {
    id: "11",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/56e275dac1648915a8eb621ed818890220ae5608_1602679367.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "قرص جوشان ",
    description:
      "ویتامین C یک ویتامین محلول در آب است که در ساخت و تعمیر بافت های بدن، تولید انرژی، ترشح هورمونها و انتقال پیام های عصبی نقش دارد. ",
    price: 1602,
    count: 1,
  },
  {
    id: "12",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/2180865dcfdaa31a9d98102465994e4498726a69_1716728856.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    name: "گوشی موبایل نوکیا",
    description:
      "اگر به دنبال خرید گوشی هستید که برای استفاده روزمره عملکرد قابل قبولی داشته باشد، قطعا گوشی‌های کلاسیک می‌توانند گزینه بسیار مناسبی را در اختیارتان قرار دهند.",
    price: 8487,
    count: 1,
  },
]

module.exports = productsList
