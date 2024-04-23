import List from "../components/List";
import PricingCard from "../components/PricingCard";

const SubscriptionPlans = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-white pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Teal Climate
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208]text-white sm:text-4xl md:text-[40px]">
                Our Subscription Plans
              </h2>
              <p className="text-base text-body-color">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="-mx-4 flex flex-wrap">
            <PricingCard
              redirectTo="/subscribe?plan=basic"
              type="Basic"
              price="$2000"
              subscription="month"
              description="Perfect for using in a personal website or a client project."
              buttonText="Choose Basic"
            >
              <List>10 Bussiness Units</List>
              <List>Lorem ipsum dolor sit</List>
              <List>Lorem ipsum dolor sit</List>
              <List>Lorem ipsum dolor sit</List>
              <List>Lorem ipsum dolor sit</List>
              <List>Lorem ipsum dolor sit</List>
            </PricingCard>
            <PricingCard
              redirectTo="/subscribe?plan=pro"
              type="Pro"
              price="$2500"
              subscription="month"
              description="Perfect for using in a personal website or a client project."
              buttonText="Choose Pro"
              active
            >
              <List>20 Bussiness Units</List>
              <List>One to One Advisory (45minutes)</List>
              <List>Lorem ipsum dolor sit</List>
              <List>Lorem ipsum dolor sit</List>
              <List>Lorem ipsum dolor sit</List>
              <List>Lorem ipsum dolor sit</List>
            </PricingCard>
            {/* <PricingCard
              type="Professional"
              price="$256"
              subscription="year"
              description="Perfect for using in a personal website or a client project."
              buttonText="Choose Professional"
            >
              <List>Unlimited User</List>
              <List>All UI components</List>
              <List>Lifetime access</List>
              <List>Free updates</List>
              <List>Unlimited project</List>
              <List>12 Months support</List>
            </PricingCard> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
