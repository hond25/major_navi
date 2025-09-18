const majorData = {
    'メディアイノベーション専攻': {
        catchphrase: 'ITクリエイターになるために必要な知識を幅広く学ぶことのできる専攻',
        description: '様々なテクノロジーを活用して新たなサービスを生み出すための理論や技術を習得する。デザインやプロトタイプなど実際に自分で手を動かして作成・発表する授業が多い。',
        tags: ['UI/UX', 'プログラミング', 'IoTデバイス', 'webサービス企画', '課題解決'],
        themeClass: 'theme-media-innovation',
        link: 'https://www.kyoto-seika.ac.jp/edu/media/mediainnovation/index.html'
    },
    'メディアコミュニケーション専攻': {
        catchphrase: '多様な人たちと連携しながらメディアやコンテンツを企画・開発を行う専攻',
        description: '対面コミュニケーションを含む様々な相互作用について学ぶともに、リサーチ・運営・プレゼンテーション等に取り組みながら自分たちの企画をイベントやプロジェクトなどの現場で検証していく。',
        tags: ['プロジェクト企画', 'リサーチ', 'イベント運営', 'ワークショップ'],
        themeClass: 'theme-media-communication',
        link: 'https://www.kyoto-seika.ac.jp/edu/media/mediacommunication/index.html'
    },
    '音楽メディア専攻': {
        catchphrase: '「音」に関わること全般を幅広く学び、新たな表現を創造する専攻',
        description: '音楽はもちろん、環境音や効果音といった「非楽音」の分野にも力を入れている。スタジオでのレコーディングやライブでのPAなど、音楽の現場を「担う」側の技術も積極的に学ぶことができる。',
        tags: ['作曲/編曲', 'サウンドデザイン', 'サウンドスケープ', '音楽プログラミング'],
        themeClass: 'theme-music-media',
        link: 'https://www.kyoto-seika.ac.jp/edu/media/soundcreation/index.html'
    },
    'メディアデザイン専攻': {
        catchphrase: 'ビジュアル表現を超えたまだ見ぬメディアの使い方を創造する専攻',
        description: '企画・編集、グラフィックデザイン、映像製作、インタラクションなどの基礎技法を幅広く学ぶ。学年が上がるにつれてそれらを組み合わせていきながら自身の表現を追求していくことができる。',
        tags: ['グラフィック', '映像制作', '3DCG', 'インタラクション', 'メディアアート'],
        themeClass: 'theme-media-design',
        link: 'https://www.kyoto-seika.ac.jp/edu/media/mediadesign/index.html'
    }
};

// --- 診断のルート分岐設定 ---
const quizTree = {
    'q1': {
         text: '社会や身の回りの人が抱えている課題を見つけて「自分ならこうするのに」と考えることがよくある。', yes: 'q2', no: 'q5', icon:'./img/q1_icon.png' },
    'q2': { text: '社会の課題を企画やプロジェクトの形で「人と協力して動かす」ことに興味がある。', yes: 'q3', no: 'q6', icon:'./img/q2_icon.png' },
    'q3': { text: '自分のアイデアや企画したものを社会に発信し、反応を受けて改善していくことにやりがいを感じる。', yes: 'q4', no: 'q6', icon:'./img/q3_icon.png' },
    'q4': { text: '自分のアイデアを社会に発信していく場合、自分が手を動かして技術やサービスを「作ること」に重きを置きたい。', yes: 'メディアイノベーション専攻', no: 'メディアコミュニケーション専攻', icon:'./img/q4_icon.png' },
    'q5': { text: 'たとえ人や社会の役に立たない可能性があっても「自分の表現したいもの」や「やりたいこと」を追求したい。', yes: 'q7', no: 'q9', icon:'./img/q5_icon.png' },
    'q6': { text: 'プログラミングや電子工作などテクノロジーを活用して「自分で作って解決すること」に興味がある。', yes: 'q4', no: 'メディアコミュニケーション専攻', icon:'./img/q6_icon.png' },
    'q7': { text: '映像を見る時は視覚情報よりも聴覚情報の方に意識が向きがちである。', yes: 'q8', no: 'q9', icon:'./img/q7_icon.png' },
    'q8': { text: '聴覚的なアプローチから表現したり、音や音楽を用いて環境や仕組みづくりに活かしたりしたい。', yes: '音楽メディア専攻', no: 'メディアデザイン専攻', icon:'./img/q8_icon.png' },
    'q9': { text: 'グラフィックや動画、3Dモデリングなど、複数の制作ソフトや表現技法を学ぶことに対しては苦に思わない。', yes: 'q10', no: 'メディアコミュニケーション専攻', icon:'./img/q10_icon.png' },
    'q10': { text: '批評的に物事を考えたり、「本当にそれが必要？」と疑問を持つことが多い。', yes: 'メディアコミュニケーション専攻', no: 'メディアデザイン専攻', icon:'./img/q10_icon.png' }
};

// --- プログラム本体 ---
const container = document.querySelector('.container');
const titleLogo = document.querySelector('.title-logo');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const quizIconImg = document.getElementById('quiz-icon-img');
const restartBtn = document.getElementById('restart-btn');

// 結果画面の新しい要素
const resultMajorName = document.getElementById('result-major-name');
const resultCatchphrase = document.getElementById('result-catchphrase');
const resultMajorDescription = document.getElementById('result-major-description');
const resultTagsContainer = document.getElementById('result-tags');
// const majorLinkBtn = document.getElementById('major-link-btn');
const majorLinkA = document.getElementById('major-link-a');

let currentQuestionId;

function initialize() {
    currentQuestionId = 'q1';
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    
    // ★★★ 修正箇所 ★★★
    // classNameを直接書き換えて、テーマクラスを削除しつつhiddenクラスを確実に適用
    resultsScreen.className = 'hidden';

    displayQuestion(currentQuestionId);
    
    container.classList.remove('quiz-active');
    container.classList.remove('result-active');
    document.body.classList.remove('state-active'); 
}

function displayQuestion(questionId) {
    const question = quizTree[questionId];
    questionText.textContent = question.text;
    quizIconImg.src = question.icon;
}

function showResult(majorName) {
    // 古いテーマクラスを全て削除する（安全のため）
    Object.values(majorData).forEach(data => {
        resultsScreen.classList.remove(data.themeClass);
    });

    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden'); // 'hidden'クラスだけを外す
    container.classList.remove('quiz-active');
    container.classList.add('result-active');
    
    const data = majorData[majorName];
    if (!data) return;

    const majorNameHtml = majorName.replace('専攻', '<span class="senko-suffix">専攻</span>');
    resultMajorName.innerHTML = majorNameHtml;
    
    resultCatchphrase.textContent = data.catchphrase;
    resultMajorDescription.textContent = data.description;
    // majorLinkBtn.textContent = majorName;
    majorLinkA.href = data.link;
    

    resultTagsContainer.innerHTML = '';
    data.tags.forEach(tagText => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag-pill';
        tagElement.textContent = tagText;
        resultTagsContainer.appendChild(tagElement);
    });

    // 新しいテーマクラスを追加する
    resultsScreen.classList.add(data.themeClass);
}

function handleAnswer(isYes) {
    const currentQuestion = quizTree[currentQuestionId];
    const nextStep = isYes ? currentQuestion.yes : currentQuestion.no;

    if (quizTree[nextStep]) {
        currentQuestionId = nextStep;
        displayQuestion(currentQuestionId);
    } else {
        showResult(nextStep);
    }
}

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    container.classList.add('quiz-active');
    container.classList.remove('result-active');
    document.body.classList.add('state-active'); // ← この行を追加
});

yesBtn.addEventListener('click', () => handleAnswer(true));
noBtn.addEventListener('click', () => handleAnswer(false));
restartBtn.addEventListener('click', initialize);
titleLogo.addEventListener('click', initialize);

initialize();