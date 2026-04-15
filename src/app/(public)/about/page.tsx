import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { CTAButton } from '@/components/ui/cta-button'

export const metadata: Metadata = {
  title: 'ABOUT',
  description: 'めしあがレーベルとは。名前の由来、哲学、そして私たちのつくり方。',
}

const PHILOSOPHIES = [
  {
    number: '01',
    title: '作品は、料理だ。',
    body: '私たちは、すべてのエンタメを「作品」と呼びます。音楽も、動画も、ライブも、企画も。そのすべてに仕込みがあり、焼き加減があり、盛り付けがある。だから私たちは、それを「差し出す」つもりで届けます。',
  },
  {
    number: '02',
    title: '熱量が、味を決める。',
    body: 'どれだけ洗練された企画でも、熱がなければ人の心は動かない。私たちは「本気でふざける」「真剣に遊ぶ」姿勢を何より大切にしています。',
  },
  {
    number: '03',
    title: '愛嬌は、最強の武器。',
    body: '正しいだけでは足りない。上手いだけでは伝わらない。人の記憶に残るのは、いつだって愛嬌のある存在です。めしあがレーベルのタレントは、みんなどこか人間味がある。',
  },
  {
    number: '04',
    title: '少し変で、ちゃんと本気。',
    body: '既存の型にハマることに興味はありません。でも、「変わっている」だけでは足りない。ちゃんと本気で、ちゃんと届ける。そのバランスが、めしあがレーベルのスタイルです。',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="ABOUT"
        subtitle="About Us"
        description="めしあがレーベルとは何か。名前の由来、哲学、そして私たちのつくり方。"
      />

      {/* Name Origin */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs tracking-[0.3em] text-vermillion font-medium mb-4">NAME ORIGIN</p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            「めしあがれ」に込めた想い
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-vermillion" />

          <div className="mt-12 space-y-6 text-ink-light leading-[2] text-base">
            <p>
              「めしあがれ」——日本語で最も丁寧な「食べてください」の表現。
              そこには、相手への敬意と、自分の作品に対する覚悟が同居しています。
            </p>
            <p>
              私たちが届けるのは、食事ではありません。
              エンタメという名の「作品」です。
            </p>
            <p>
              でも、その届け方は「召し上がれ」という言葉が持つ、
              おもてなしの精神と同じでありたい。
            </p>
            <p>
              丁寧に仕込んで、心を込めて差し出す。
              受け取った人が笑顔になる。その循環を、「レーベル」として回していく。
            </p>
            <p>
              だから、<strong className="text-ink font-semibold">めしあがレーベル</strong>。
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs tracking-[0.3em] text-vermillion font-medium mb-4">PHILOSOPHY</p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            4つのポリシー
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-vermillion" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {PHILOSOPHIES.map((p) => (
              <div key={p.number} className="group">
                <span className="text-5xl font-black text-vermillion/15 font-[family-name:var(--font-inter)]">
                  {p.number}
                </span>
                <h3 className="mt-2 text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-4 text-sm text-ink-light leading-[2]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Representative Message */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs tracking-[0.3em] text-vermillion font-medium mb-4">MESSAGE</p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            代表メッセージ
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-vermillion" />

          <div className="mt-12 space-y-6 text-ink-light leading-[2] text-base">
            <p>
              ぶっちゃけると、最初は「名前としてちょっと面白いよね」ってところから入っています（笑）。
              やっぱり真面目すぎる名前より、少し引っかかりがあって、"え、めしあがレーベルって何？"って会話のきっかけになる名前がよかったんです。
            </p>
            <p>
              でも、後から自分でもすごくしっくりきたのが、"めしあがれ"っておもてなしの言葉でもあるところで。
              応援してくださる方や関わってくださる方に対して、こちらが自信を持って作ったコンテンツやステージを、「どうぞめしあがれ」って差し出す感じがあるなと。
            </p>
            <p>
              最初は半分ノリというか、名前の面白さから考えた部分もあったんですけど、今振り返ると、ちゃんと自分たちの姿勢にも合っている名前になったなと思っています。
            </p>
          </div>
          <p className="mt-10 text-sm font-medium text-ink">
            めしあがレーベル 代表
          </p>
        </div>
      </section>

      {/* How we make */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-vermillion font-medium mb-4">PROCESS</p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            めしあがレーベルのつくり方
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-vermillion mx-auto" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '仕込み', desc: '企画を練り、素材を集め、チームで議論する。この過程を大切にします。' },
              { step: '調理', desc: '熱量を注ぎ込んで制作。妥協しない、でも楽しむ。' },
              { step: '召し上がれ', desc: '世の中に差し出す。リアクションを受け取り、次の仕込みに活かす。' },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-cream">
                <span className="text-3xl font-black text-vermillion font-[family-name:var(--font-inter)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{item.step}</h3>
                <p className="mt-3 text-sm text-ink-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-3xl px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton href="/talent" variant="primary" size="lg">
            タレントを見る
          </CTAButton>
          <CTAButton href="/contact" variant="outline" size="lg">
            お問い合わせ
          </CTAButton>
        </div>
      </section>
    </>
  )
}
