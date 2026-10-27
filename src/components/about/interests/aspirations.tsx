import { Container, SectionTitle } from '@/components/common';
import FutureGoals from './future-goals';
import TechnicalChallenges from './technical-challenges';

const Aspirations = () => {
  return (
    <section className="border-b py-20 md:py-28">
      <Container className="py-0">
        <SectionTitle
          title="目指しているもの"
          subtitle="技術的な挑戦と将来の目標についてご紹介します。"
        />
        <div className="flex flex-col gap-16">
          <TechnicalChallenges />
          <FutureGoals />
        </div>
      </Container>
    </section>
  );
};

export default Aspirations;
