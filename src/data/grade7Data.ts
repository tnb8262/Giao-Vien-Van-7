import { LiteraryWork, GrammarTopic, QuizQuestion, EssayPromptTemplate } from '../types';

export const INITIAL_GREETING = `Chào bạn! Mình là trợ lý học tập dành riêng cho môn **Ngữ văn lớp 7**.

Mình ở đây để cùng bạn khám phá những bài thơ, truyện ngắn, văn bản nghị luận hay cách viết đoạn văn, bài văn một cách hiệu quả nhất. Mình sẽ không làm bài tập hộ bạn, nhưng mình sẽ hướng dẫn để bạn tự tư duy, tìm ý và viết bài thật tốt.

Nếu bạn đang gặp khó khăn với bài học nào, hoặc có câu hỏi về kiến thức Tiếng Việt, hãy chia sẻ với mình nhé! Hôm nay chúng ta sẽ bắt đầu với tác phẩm hay chủ đề nào đây?`;

export const QUICK_SUGGESTIONS = [
  { label: '👋 Giới thiệu bản thân', text: 'xin chào, bạn là ai?' },
  { label: '⚽ Thử nghiệm phạm vi', text: 'lịch thi đấu bóng đá hôm nay' },
  { label: '📖 Phân tích Bầy chim chìa vôi', text: 'Hãy hướng dẫn mình phân tích tâm trạng của hai anh em Mên và Mon trong truyện Bầy chim chìa vôi' },
  { label: '🌸 Cảm xúc bài Đồng dao mùa xuân', text: 'Hướng dẫn viết đoạn văn ghi lại cảm xúc về hình tượng người lính trong bài thơ Đồng dao mùa xuân' },
  { label: '📝 Lập dàn ý Văn biểu cảm', text: 'Giúp mình lập dàn ý bài văn biểu cảm về người bà kính yêu' },
  { label: '🌿 Biện pháp tu từ Điệp ngữ', text: 'Thế nào là điệp ngữ và các dạng điệp ngữ thường gặp trong Ngữ văn 7?' },
];

export const LITERARY_WORKS: LiteraryWork[] = [
  {
    id: 'bay-chim-chia-voi',
    title: 'Bầy chim chìa vôi',
    author: 'Nguyễn Quang Thiều',
    genre: 'Truyện ngắn hiện đại',
    series: 'kntt',
    seriesName: 'Kết nối tri thức',
    unit: 'Bài 1: Bầu trời tuổi thơ',
    summary: 'Vào một đêm mưa to nước sông dâng cao, hai anh em Mên và Mon trằn trọc lo lắng cho bầy chim chìa vôi non ở bãi cát giữa sông. Rạng sáng, hai đứa chèo thuyền ra cứu và xúc động nghẹn ngào khi chứng kiến cảnh những cánh chim non dũng cảm cất cánh bay lên giữa dòng nước lũ.',
    coreTheme: 'Tình yêu thương vạn vật trong sáng, lòng trắc ẩn và vẻ đẹp tâm hồn trẻ thơ giàu lòng nhân hậu.',
    highlights: [
      'Cuộc trò chuyện thì thầm lúc nửa đêm của Mên và Mon',
      'Khoảnh khắc hồi hộp khi nước sông ngập bãi cát',
      'Bức tranh tuyệt đẹp lúc bình minh: bầy chim non đập cánh bay lên bầu trời',
      'Giọt nước mắt hạnh phúc của hai anh em'
    ],
    keyQuotes: [
      '"Hình như hai đứa bé đều nhìn thấy bầy chim non đã bay lên."',
      '"Hai anh em đứng lặng nhìn theo những cánh chim... Nước mắt chúng ứa ra vì sung sướng."'
    ],
    sampleQuestions: [
      'Tâm trạng lo lắng của hai đứa trẻ được thể hiện qua những chi tiết nào?',
      'Ý nghĩa của hình ảnh bầy chim chìa vôi non cất cánh bay lên vào buổi bình minh?',
      'Bài học về tình yêu thương thiên nhiên em rút ra được từ tác phẩm là gì?'
    ]
  },
  {
    id: 'di-lay-mat',
    title: 'Đi lấy mật (Trích Đất rừng phương Nam)',
    author: 'Đoàn Giỏi',
    genre: 'Tiểu thuyết phiêu lưu / Truyện thiếu nhi',
    series: 'kntt',
    seriesName: 'Kết nối tri thức',
    unit: 'Bài 1: Bầu trời tuổi thơ',
    summary: 'Đoạn trích kể về một chuyến đi vào rừng U Minh lấy mật ong của chú bé An cùng tía nuôi và thằng Cò. Qua con mắt quan sát tinh tế của An, thiên nhiên Nam Bộ hiện lên hoang sơ, trù phú đầy sức sống cùng con người phương Nam thuần hậu, can trường.',
    coreTheme: 'Vẻ đẹp hoang sơ, trù phú và kỳ thú của thiên nhiên rừng tràm U Minh; tình cảm gắn bó của con người với đất rừng phương Nam.',
    highlights: [
      'Không gian buổi sáng rừng U Minh với ánh nắng len qua kẽ lá',
      'Nghệ thuật thuần dưỡng và làm kèo cho ong làm tổ của người dân phương Nam',
      'Sự am hiểu tường tận thiên nhiên của tía nuôi và sự nhanh nhẹn của thằng Cò'
    ],
    keyQuotes: [
      '"Rừng tràm râm mát. Mùi hương hoa tràm ngòn ngọt thoang thoảng bay khắp cánh rừng."',
      '"Gió bắt đầu thổi rào rào theo với khối mặt trời tròn đang tuôn ánh sáng vàng rực xuống mặt đất."'
    ],
    sampleQuestions: [
      'Cảnh sắc thiên nhiên rừng U Minh được miêu tả qua những giác quan nào?',
      'Em có nhận xét gì về tính cách của nhân vật Cò và tía nuôi?',
      'Cách nhìn cuộc sống và sự vật của cậu bé An có gì đặc biệt?'
    ]
  },
  {
    id: 'dong-dao-mua-xuan',
    title: 'Đồng dao mùa xuân',
    author: 'Nguyễn Khoa Điềm',
    genre: 'Thơ bốn chữ',
    series: 'kntt',
    seriesName: 'Kết nối tri thức',
    unit: 'Bài 2: Khúc nhạc tâm hồn',
    summary: 'Bài thơ khắc họa chân dung người lính trẻ đi vào chiến trường từ thuở hoa đào đang nở và vĩnh viễn nằm lại nơi đại ngàn Trường Sơn. Người lính ra đi nhưng tuổi xuân, nụ cười và lý tưởng sống của anh vẫn còn mãi, hòa vào mùa xuân bất tận của đất nước.',
    coreTheme: 'Lòng biết ơn sâu sắc và niềm tự hào trước sự hi sinh thầm lặng của những người lính trẻ vì nền độc lập tự do của Tổ quốc.',
    highlights: [
      'Nhịp điệu thơ 4 chữ như tiếng đồng dao mộc mạc, tha thiết',
      'Chân dung người lính hồn nhiên: chưa yêu lần nào, mê thả diều',
      'Sự bất tử của anh bộ đội: anh hóa thành ngọn lửa, thành mùa xuân đất nước'
    ],
    keyQuotes: [
      '"Có một người lính / Đi vào núi xanh / Những năm máu lửa"',
      '"Anh thành ngọn lửa / Bạn bè mang theo / Ngồi trên đá nhọn / Suốt đời mỉm cười"'
    ],
    sampleQuestions: [
      'Hình ảnh người lính hiện lên với những đặc điểm nổi bật nào?',
      'Tác dụng của thể thơ bốn chữ và nhịp điệu đồng dao trong việc thể hiện cảm xúc?',
      'Ý nghĩa nhan đề "Đồng dao mùa xuân" là gì?'
    ]
  },
  {
    id: 'gap-la-com-nep',
    title: 'Gặp lá cơm nếp',
    author: 'Thanh Thảo',
    genre: 'Thơ năm chữ',
    series: 'kntt',
    seriesName: 'Kết nối tri thức',
    unit: 'Bài 2: Khúc nhạc tâm hồn',
    summary: 'Trên đường hành quân xa nhà, bắt gặp hương lá cơm nếp ven rừng, người chiến sĩ bồi hồi nhớ về người mẹ già nơi quê nhà đang nhặt củi, nhóm lửa nấu nồi xôi nếp. Tình cảm nhớ mẹ hòa quyện sâu sắc với tình yêu quê hương đất nước.',
    coreTheme: 'Tình mẫu tử thiêng liêng và sự gắn kết bền chặt giữa tình yêu gia đình với tình yêu quê hương, đất nước.',
    highlights: [
      'Hình ảnh chiếc lá cơm nếp gợi nhớ món xôi quen thuộc và mùi vị quê hương',
      'Chân dung người mẹ tần tảo sớm hôm chắt chiu từng hạt nếp',
      'Sự hòa quyện giữa hai tiếng "Mẹ" và "Đất nước"'
    ],
    keyQuotes: [
      '"Mẹ già ở một mình / Chiều nay về nhặt củi / Cơm nếp thơm hương mùa"',
      '"Mẹ già như hạt gạo / Nấu thành xôi nếp thơm / Cho con nguồn sức mạnh"'
    ],
    sampleQuestions: [
      'Nguyên nhân nào đã khơi dậy nỗi nhớ mẹ trong lòng người lính?',
      'Em hiểu thế nào về sự gắn bó giữa tình yêu mẹ và tình yêu đất nước trong bài thơ?'
    ]
  },
  {
    id: 'vua-nham-mat-vua-mo-cua-so',
    title: 'Vừa nhắm mắt vừa mở cửa sổ',
    author: 'Nguyễn Ngọc Thuần',
    genre: 'Truyện dài thiếu nhi',
    series: 'kntt',
    seriesName: 'Kết nối tri thức',
    unit: 'Bài 3: Cội nguồn yêu thương',
    summary: 'Kể về những trò chơi mà người bố dạy cho cậu bé: nhắm mắt để đoán tên các loài hoa bằng mùi hương, nhắm mắt đoán khoảng cách tiếng bước chân. Qua đó, người bố dạy con cách cảm nhận thế giới bằng cả tâm hồn, biết trân trọng những điều bình dị và yêu thương mọi người xung quanh.',
    coreTheme: 'Bài học nhân văn sâu sắc về tình phụ tử, cách lắng nghe và cảm nhận cuộc sống bằng mọi giác quan và sự thấu cảm.',
    highlights: [
      'Trò chơi nhận biết từng loài hoa qua mùi hương đặc trưng',
      'Triết lý sống: khu vườn là một món quà, mỗi người là một bông hoa đặc biệt',
      'Quan niệm về sự cho đi và nhận lại trong cuộc sống'
    ],
    keyQuotes: [
      '"Bạn hãy tưởng tượng một buổi sáng mờ sương. Bạn vừa nhắm mắt vừa mở cửa sổ, và bạn chợt hiểu khu vườn nói gì."',
      '"Một món quà bao giờ cũng đẹp. Khi ta nhận hay cho một món quà, ta cũng đẹp lây vì món quà đó."'
    ],
    sampleQuestions: [
      'Những bài học mà người bố đã dạy cho nhân vật "tôi" là gì?',
      'Thông điệp "Mỗi người là một bông hoa" gợi cho em suy nghĩ gì về giá trị của bản thân?'
    ]
  },
  {
    id: 'nguoi-thay-dau-tien',
    title: 'Người thầy đầu tiên',
    author: 'Tsin-ghi-dơ Ai-tơ-ma-tốp',
    genre: 'Truyện vừa dịch',
    series: 'kntt',
    seriesName: 'Kết nối tri thức',
    unit: 'Bài 3: Cội nguồn yêu thương',
    summary: 'Tác phẩm kể về thầy Đuy-sen – người thầy đã vượt qua định kiến lạc hậu, khó khăn gian khổ để dựng nên ngôi trường đầu tiên tại ngôi làng hẻo lánh vùng Cư-rơ-gư-xtan. Thầy đã dìu dắt, che chở cô bé mồ côi An-tư-nai, thắp sáng ước mơ và thay đổi cuộc đời cô.',
    coreTheme: 'Tôn vinh đức hi sinh cao cả, tấm lòng nhân hậu vô bờ của người thầy giáo và sức mạnh cứu rỗi của tri thức.',
    highlights: [
      'Hình ảnh hai cây phong trên đỉnh đồi như biểu tượng của tình thầy trò',
      'Hành động thầy Đuy-sen bế từng em nhỏ lội qua dòng suối băng lạnh buốt',
      'Lòng biết ơn trọn đời của viện sĩ An-tư-nai đối với người thầy đầu tiên'
    ],
    keyQuotes: [
      '"Thầy Đuy-sen đã mở ra trước mắt chúng tôi một thế giới mới mà trước đây chúng tôi chưa từng biết tới."',
      '"Hai cây phong đứng đó như hai ngọn hải đăng soi rọi vào tâm hồn trẻ thơ."'
    ],
    sampleQuestions: [
      'Những phẩm chất cao quý nào của thầy Đuy-sen khiến học trò và người đọc cảm động?',
      'Ý nghĩa biểu tượng của hình ảnh hai cây phong trong truyện?'
    ]
  },
  {
    id: 'mua-xuan-nho-nho',
    title: 'Mùa xuân nho nhỏ',
    author: 'Thanh Hải',
    genre: 'Thơ năm chữ',
    series: 'ctst',
    seriesName: 'Chân trời sáng tạo',
    unit: 'Chủ đề: Tiếng nói của vạn vật',
    summary: 'Được sáng tác vào tháng 11/1980 khi nhà thơ đang trên giường bệnh trước lúc qua đời. Bài thơ bộc lộ cảm xúc say đắm trước vẻ đẹp mùa xuân của thiên nhiên, đất nước và khát vọng cháy bỏng muốn hiến dâng một "mùa xuân nho nhỏ" của cuộc đời mình cho Tổ quốc.',
    coreTheme: 'Tình yêu thiên nhiên tha thiết, tình yêu quê hương đất nước và lẽ sống cống hiến âm thầm, khiêm nhường cho cuộc đời chung.',
    highlights: [
      'Bức tranh mùa xuân xứ Huế: bông hoa tím biếc mọc giữa dòng sông xanh',
      'Âm thanh giọt long lanh rơi - sự chuyển đổi cảm giác tài tình',
      'Ước nguyện làm con chim hót, một cành hoa, một nốt trầm xao xuyến'
    ],
    keyQuotes: [
      '"Mọc giữa dòng sông xanh / Một bông hoa tím biếc / Ơi con chim chiền chiện / Hót chi mà vang trời"',
      '"Một mùa xuân nho nhỏ / Lặng lẽ dâng cho đời / Dù là tuổi hai mươi / Dù là khi tóc bạc"'
    ],
    sampleQuestions: [
      'Vẻ đẹp mùa xuân thiên nhiên được miêu tả qua những màu sắc, âm thanh nào?',
      'Phân tích ý nghĩa của hình ảnh "mùa xuân nho nhỏ" trong bài thơ?'
    ]
  },
  {
    id: 'ech-ngoi-day-gieng',
    title: 'Ếch ngồi đáy giếng & Thầy bói xem voi',
    author: 'Truyện ngụ ngôn dân gian Việt Nam',
    genre: 'Truyện ngụ ngôn',
    series: 'cd',
    seriesName: 'Cánh diều',
    unit: 'Chủ đề: Bài học cuộc sống',
    summary: 'Truyện ngụ ngôn mượn hình tượng loài vật và con người để gửi gắm những bài học nhân sinh sâu sắc: Phê phán thói kiêu căng ngạo mạn, tầm nhìn hạn hẹp (con ếch) và cách nhìn nhận sự vật phiến diện, áp đặt chủ quan (các ông thầy bói).',
    coreTheme: 'Khuyên răn con người phải khiêm tốn học hỏi, mở rộng tầm nhìn hiểu biết và luôn nhìn nhận sự việc một cách khách quan, toàn diện.',
    highlights: [
      'Không gian đáy giếng chật hẹp đối lập với bầu trời bao la',
      'Hành động chủ quan của năm ông thầy bói mù sờ từng bộ phận rồi cãi nhau',
      'Tiếng cười châm biếm sâu sắc và bài học ứng xử trong cuộc sống'
    ],
    keyQuotes: [
      '"Nó tưởng bầu trời trên đầu chỉ bé bằng chiếc vung và nó thì oai như một vị chúa tể."',
      '"Thầy nào cũng cho là mình đúng, không ai chịu ai, thành ra xô xát đánh nhau toác đầu chảy máu."'
    ],
    sampleQuestions: [
      'Vì sao con ếch lại phải chịu kết cục bi thảm?',
      'Sai lầm lớn nhất của các ông thầy bói khi xem voi là gì?',
      'Em rút ra được bài học gì cho việc học tập và quan sát cuộc sống hàng ngày?'
    ]
  }
];

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'diep-ngu',
    title: 'Biện pháp tu từ Điệp ngữ',
    tag: 'Tu từ',
    concept: 'Điệp ngữ là biện pháp tu từ nhắc đi nhắc lại một từ, một ngữ (hoặc cả câu) nhiều lần trong câu văn, câu thơ nhằm nhấn mạnh, làm nổi bật cảm xúc, tạo nhịp điệu hoặc gợi mở hình ảnh sâu sắc.',
    classification: [
      'Điệp ngữ cách quãng: Các từ ngữ điệp được nhắc lại cách nhau một vài từ/dòng thơ.',
      'Điệp ngữ nối tiếp: Các từ ngữ điệp đứng liền sát nhau.',
      'Điệp ngữ vòng (điệp chuyển tiếp): Từ ngữ cuối câu trước được lặp lại ở đầu câu sau.'
    ],
    examples: [
      {
        sentence: '"Anh thành ngọn lửa / Bạn bè mang theo / Ngồi trên đá nhọn / Suốt đời mỉm cười" (Đồng dao mùa xuân)',
        explanation: 'Nhắc lại hình tượng người lính để khắc sâu vẻ đẹp bất tử và nụ cười thanh xuân.'
      },
      {
        sentence: '"Tre giữ làng, giữ nước, giữ mái nhà tranh, giữ đồng lúa chín" (Thép Mới)',
        explanation: 'Điệp từ "giữ" nối tiếp tạo nhịp văn dồn dập, khẳng định công lao to lớn của cây tre Việt Nam.'
      }
    ],
    tips: 'Khi phân tích điệp ngữ, cần chỉ ra: (1) Từ ngữ nào được lặp lại? (2) Nhằm nhấn mạnh nội dung gì? (3) Tác dụng tạo nhịp điệu và cảm xúc ra sao?'
  },
  {
    id: 'noi-qua-noi-giam',
    title: 'Nói quá và Nói giảm nói tránh',
    tag: 'Tu từ',
    concept: 'Nói quá là biện pháp phóng đại quy mô, mức độ của sự vật nhằm gây ấn tượng mạnh. Ngược lại, nói giảm nói tránh là cách diễn đạt tế nhị, uyển chuyển để tránh cảm giác quá đau buồn, ghê sợ hoặc bất lịch sự.',
    classification: [
      'Nói quá (Thậm xưng, ngoa dụ): "Ăn một bát cháo chạy ba quãng đồng", "Lỗ mũi mười tám gánh lông".',
      'Nói giảm nói tránh: Dùng từ đồng nghĩa tế nhị ("bác đã đi rồi", "anh ấy không còn nữa", "bài viết này chưa được tốt lắm").'
    ],
    examples: [
      {
        sentence: '"Bác đã đi rồi sao Bác ơi!" (Tố Hữu)',
        explanation: 'Từ "đi" là nói giảm nói tránh cho cái chết, xoa dịu nỗi đau thương vô hạn của toàn dân tộc.'
      },
      {
        sentence: '"Gươm mài đá, đá núi cũng mòn / Voi uống nước, nước sông phải cạn" (Nguyễn Trãi)',
        explanation: 'Biện pháp nói quá thể hiện sức mạnh hào hùng vô địch của nghĩa quân Lam Sơn.'
      }
    ],
    tips: 'Chú ý phân biệt nói quá với nói khoác: Nói quá nhằm mục đích nghệ thuật và có cơ sở hiện thực; nói khoác nhằm khoe khoang, lừa dối.'
  },
  {
    id: 'tu-han-viet',
    title: 'Từ Hán Việt & Yếu tố Hán Việt',
    tag: 'Từ vựng',
    concept: 'Từ Hán Việt là từ mượn gốc tiếng Hán nhưng được phát âm theo cách của người Việt. Từ Hán Việt tạo sắc thái trang trọng, thiêng liêng, cổ kính hoặc súc tích, hàm súc.',
    classification: [
      'Yếu tố Hán Việt đồng âm: Những yếu tố phát âm giống nhau nhưng nghĩa hoàn toàn khác nhau (VD: "phi" trong phi công = bay; "phi" trong phi pháp = trái/sai; "phi" trong hoàng phi = vợ vua).',
      'Từ ghép Hán Việt: Đẳng lập (giang sơn, sơn hà) và Chính phụ (thi nhân, quốc kỳ).'
    ],
    examples: [
      {
        sentence: '"Phụ mẫu", "phu thê", "quốc mẫu" thay vì "bố mẹ", "vợ chồng", "mẹ vua".',
        explanation: 'Tạo sắc thái trang trọng, tôn kính trong các nghi lễ hoặc văn bản lịch sử.'
      }
    ],
    tips: 'Khi tra cứu yếu tố Hán Việt, hãy đặt trong cụm từ hoàn chỉnh để tránh hiểu nhầm các từ đồng âm dị nghĩa.'
  },
  {
    id: 'mo-rong-thanh-phan-cau',
    title: 'Mở rộng thành phần chính của câu bằng cụm từ',
    tag: 'Ngữ pháp',
    concept: 'Biến chủ ngữ hoặc vị ngữ từ một từ đơn lẻ thành một cụm từ (cụm danh từ, cụm động từ, cụm tính từ) để câu văn cung cấp nhiều thông tin cụ thể, sinh động hơn.',
    classification: [
      'Mở rộng chủ ngữ: "Gió thổi." -> "Cơn gió mùa thu mát rượi thổi qua từng kẽ lá."',
      'Mở rộng vị ngữ: "Chim hót." -> "Chim hót líu lo, rộn rã trên những cành bàng non."'
    ],
    examples: [
      {
        sentence: '"Những giọt sương mai đọng trên phiến lá lấp lánh như những hạt ngọc trời."',
        explanation: 'Chủ ngữ và vị ngữ đều được mở rộng thành cụm danh từ và cụm tính từ giàu hình tượng.'
      }
    ],
    tips: 'Dùng phương pháp mở rộng thành phần câu là bí quyết để bài văn miêu tả và biểu cảm của em trở nên mềm mại, cuốn hút hơn!'
  }
];

export const QUIZ_BANK: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Trong truyện ngắn "Bầy chim chìa vôi" của Nguyễn Quang Thiều, chi tiết nào thể hiện rõ nhất tấm lòng nhân hậu của hai anh em Mên và Mon?',
    options: [
      'Hai anh em ngồi bờ sông câu cá',
      'Lo lắng không ngủ được và nửa đêm chèo đò ra bãi cát cứu bầy chim non',
      'Hai anh em rủ nhau đi hái hoa lúc sáng sớm',
      'Mên trách Mon vì làm phiền giấc ngủ của mình'
    ],
    correctIndex: 1,
    explanation: 'Chính nỗi trăn trở thức trắng đêm khi nghe mưa bão và quyết định chèo đò ra bãi cát giữa dòng nước xiết đã chứng minh tình yêu thương và sự dũng cảm xuất phát từ lòng nhân hậu của hai đứa trẻ.',
    topic: 'Bầy chim chìa vôi'
  },
  {
    id: 'q2',
    question: 'Biện pháp tu từ nào được sử dụng nổi bật trong hai câu thơ sau: "Một mùa xuân nho nhỏ / Lặng lẽ dâng cho đời" (Thanh Hải)?',
    options: [
      'Nói quá và điệp từ',
      'Ẩn dụ và hoán dụ',
      'Ẩn dụ ("mùa xuân nho nhỏ") và từ láy ("lặng lẽ")',
      'So sánh và nhân hóa'
    ],
    correctIndex: 2,
    explanation: '"Mùa xuân nho nhỏ" là hình ảnh ẩn dụ sáng tạo biểu trưng cho phần tinh túy nhất, đẹp đẽ nhất của cuộc đời mà tác giả ước nguyện khiêm nhường dâng hiến cho Tổ quốc.',
    topic: 'Mùa xuân nho nhỏ'
  },
  {
    id: 'q3',
    question: 'Yếu tố Hán Việt "hải" trong các từ "hải âu", "hải quân", "hải đăng" có nghĩa là gì?',
    options: [
      'Biển',
      'Núi',
      'Gió',
      'Đất liền'
    ],
    correctIndex: 0,
    explanation: 'Trong tiếng Hán Việt, "hải" (海) có nghĩa là biển. Do đó: hải âu = chim biển, hải quân = lực lượng quân đội trên biển, hải đăng = ngọn đèn soi đường trên biển.',
    topic: 'Từ Hán Việt'
  },
  {
    id: 'q4',
    question: 'Trong câu thơ: "Bác đã đi rồi sao Bác ơi!" (Tố Hữu), từ "đi" sử dụng biện pháp tu từ gì?',
    options: [
      'Nói quá',
      'Nói giảm nói tránh',
      'Chơi chữ',
      'Nhân hóa'
    ],
    correctIndex: 1,
    explanation: 'Từ "đi" thay thế cho từ "mất" hay "qua đời", là biện pháp nói giảm nói tránh để giảm bớt sự đau đớn, mất mát to lớn.',
    topic: 'Nói giảm nói tránh'
  },
  {
    id: 'q5',
    question: 'Mục đích cốt lõi của việc "mở rộng thành phần chính của câu bằng cụm từ" là gì?',
    options: [
      'Làm cho câu văn thật dài để đủ số lượng chữ',
      'Giúp câu biểu đạt nội dung cụ thể, chi tiết và giàu hình ảnh, cảm xúc hơn',
      'Làm biến đổi loại câu từ câu trần thuật sang câu hỏi',
      'Giúp câu văn mang giọng điệu trang trọng cổ kính'
    ],
    correctIndex: 1,
    explanation: 'Mở rộng thành phần câu giúp cung cấp thêm thông tin về đặc điểm, tính chất, hành động, làm cho câu văn sinh động và hấp dẫn người đọc hơn.',
    topic: 'Ngữ pháp'
  },
  {
    id: 'q6',
    question: 'Tác phẩm "Đồng dao mùa xuân" của Nguyễn Khoa Điềm được viết theo thể thơ nào?',
    options: [
      'Thơ lục bát',
      'Thơ bốn chữ',
      'Thơ năm chữ',
      'Thơ tự do'
    ],
    correctIndex: 1,
    explanation: 'Bài thơ được sáng tác bằng thể thơ bốn chữ với nhịp điệu ngắn, khỏe khoắn, gợi không khí của những câu hát đồng dao dân gian.',
    topic: 'Đồng dao mùa xuân'
  }
];

export const ESSAY_TEMPLATES: EssayPromptTemplate[] = [
  {
    id: 'bieu-cam-nguoi-than',
    title: 'Văn biểu cảm về người thân (Bà, Mẹ, Thầy cô...)',
    genre: 'Biểu cảm',
    description: 'Bộc lộ tình cảm, cảm xúc chân thực của em đối với người mà em yêu mến và kính trọng.',
    defaultTopic: 'Phát biểu cảm nghĩ của em về người bà kính yêu',
    suggestedSteps: [
      'Mở bài: Giới thiệu người bà và ấn tượng khái quát nhất (giọng nói, ánh mắt, sự ấm áp).',
      'Thân bài: Nêu những nét tiêu biểu khơi gợi cảm xúc (bàn tay nhăn nheo, mái tóc bạc, câu chuyện cổ tích ngày xưa); Kể lại một kỉ niệm sâu sắc; Bộc lộ tình cảm yêu thương, biết ơn.',
      'Kết bài: Khẳng định vị trí thiêng liêng của bà trong trái tim em và lời hứa ngoan ngoãn.'
    ]
  },
  {
    id: 'doan-van-cam-xuc-tho',
    title: 'Đoạn văn ghi lại cảm xúc sau khi đọc bài thơ 4 chữ / 5 chữ',
    genre: 'Nghị luận / Cảm thụ văn học',
    description: 'Viết đoạn văn (khoảng 150-200 chữ) thể hiện rung động trước vẻ đẹp nội dung và nghệ thuật của một tác phẩm thơ lớp 7.',
    defaultTopic: 'Viết đoạn văn ghi lại cảm xúc của em về bài thơ "Đồng dao mùa xuân" của Nguyễn Khoa Điềm',
    suggestedSteps: [
      'Mở đoạn: Nêu tên bài thơ, tác giả và cảm xúc bao trùm (xúc động, tự hào).',
      'Thân đoạn: Làm rõ cảm xúc qua hình ảnh thơ đặc sắc (người lính hiền lành, sự hi sinh anh dũng, sự hóa thân vào mùa xuân đất nước); Nhận xét về thể thơ 4 chữ, từ ngữ, điệp ngữ.',
      'Kết đoạn: Khái quát lại ý nghĩa bài thơ và bài học về lòng biết ơn thế hệ cha anh.'
    ]
  },
  {
    id: 'nghi-luan-doi-song',
    title: 'Văn nghị luận về một vấn đề trong đời sống lứa tuổi học sinh',
    genre: 'Nghị luận xã hội',
    description: 'Bày tỏ quan điểm đồng tình hoặc phản đối về một đức tính, hành vi hoặc thói quen.',
    defaultTopic: 'Ý kiến của em về tinh thần tự học của học sinh lớp 7 hiện nay',
    suggestedSteps: [
      'Mở bài: Giới thiệu vấn đề cần bàn luận (tinh thần tự học).',
      'Thân bài: Giải thích "tự học" là gì; Nêu vai trò, lợi ích của việc tự học (chủ động kiến thức, rèn tính kiên trì); Nêu dẫn chứng cụ thể; Phản biện những bạn lười biếng, ỷ lại chép bài; Rút ra bài học hành động.',
      'Kết bài: Khẳng định lại ý nghĩa của việc tự học đối với tương lai bản thân.'
    ]
  },
  {
    id: 'ke-lai-trai-nghiem',
    title: 'Văn tự sự: Kể lại một trải nghiệm sâu sắc của bản thân',
    genre: 'Tự sự kết hợp miêu tả & biểu cảm',
    description: 'Kể lại một chuyến đi, một sự việc đáng nhớ đã giúp em trưởng thành hơn.',
    defaultTopic: 'Kể lại một trải nghiệm đáng nhớ giúp em nhận ra bài học quý giá về tình bạn',
    suggestedSteps: [
      'Mở bài: Dẫn dắt sự việc và tâm trạng mỗi khi nhớ lại trải nghiệm đó.',
      'Thân bài: Diễn biến sự việc theo trình tự thời gian (hoàn cảnh xảy ra mâu thuẫn hoặc sự cố; cao trào; cách giải quyết thấu tình đạt lý); Đan xen yếu tố miêu tả cảnh vật và biểu cảm nội tâm.',
      'Kết bài: Cảm xúc hiện tại và bài học trưởng thành rút ra từ trải nghiệm.'
    ]
  }
];
