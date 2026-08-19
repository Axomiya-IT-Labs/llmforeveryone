import { Hero } from './Hero';
import { FeaturePillars, ThoughtLeadership } from './FeatureSections';
import { IndustryGrid } from './IndustryGrid';
import { WizardPreview } from './WizardPreview';
import { FAQSection } from './FAQSection';

export function HomeView() {
  return (
    <>
      <Hero />
      <FeaturePillars />
      <IndustryGrid />
      <WizardPreview />
      <ThoughtLeadership />
      <FAQSection />
    </>
  );
}
