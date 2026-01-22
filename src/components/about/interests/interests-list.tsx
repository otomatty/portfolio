'use client';

import { Container, SectionTitle } from '@/components/common';
import OtherInterests from './other-interests';
import TechnicalInterests from './technical-interests';

const InterestsList = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="興味関心"
          subtitle="技術的な興味関心と、プライベートでの趣味についてご紹介します。"
        />
        <div className="flex flex-col gap-16">
          <TechnicalInterests />
          <OtherInterests />
        </div>
      </Container>
    </section>
  );
};

export default InterestsList;
