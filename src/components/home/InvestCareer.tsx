import { IMAGES } from "../../constants/images";
const INVEST_CARDS = [
  {
    icon: IMAGES.GOAL,
    title: "Explore new skills",
    description:
      "Access 10,000+ courses in AI, business, technology, and more.",
  },
  {
    icon: IMAGES.EARN,
    title: "Earn valuable credentials",
    description:
      "Get certificates for every course you finish and boost your chances of getting hired after your trial ends at no additional cost.",
  },
  {
    icon: IMAGES.STAR,
    title: "Learn from the best",
    description:
      "Take your skills to the next level with expert-led courses and Coursera Coach, your AI-powered guide.",
  },
];

const InvestCareer = () => {
  return (
    <section className="w-full min-h-[296px] bg-hero-bg flex items-center py-10 sm:py-12 md:py-0 2xl:py-8">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 mx-auto w-full max-w-[1440px]">
        <h2 className="font-normal text-[22px] leading-[24px] sm:text-[24px] sm:leading-[26px] md:text-[25.49px] md:leading-[24.74px] lg:text-[28px] lg:leading-[30px] 2xl:text-[32px] 2xl:leading-[34px] text-hero-heading-dark mb-8 sm:mb-10 lg:mb-12">
          Invest in your career
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 2xl:gap-16">
          {INVEST_CARDS.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-start text-left max-w-[360px] md:max-w-[320px] lg:max-w-[360px] 2xl:max-w-[420px] mx-auto"
            >
              <img
                src={card.icon}
                alt={card.title}
                className="h-[28px] sm:h-[30px] md:h-[32px] lg:h-[34px] 2xl:h-[36px] w-auto object-contain mb-3 sm:mb-4"
              />

              <h3 className="font-normal text-[16px] leading-[18px] sm:text-[16.5px] sm:leading-[18.5px] md:text-[17.24px] md:leading-[18.74px] lg:text-[18px] lg:leading-[20px] 2xl:text-[20px] 2xl:leading-[22px] text-hero-subheading mb-2">
                {card.title}
              </h3>
              <p className="font-normal text-[12.5px] leading-[14px] sm:text-[13px] sm:leading-[14.5px] md:text-[13.49px] md:leading-[14.24px] lg:text-[14px] lg:leading-[16px] 2xl:text-[15px] 2xl:leading-[18px] text-hero-text">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestCareer;
