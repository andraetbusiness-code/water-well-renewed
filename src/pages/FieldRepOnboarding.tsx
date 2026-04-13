import { Helmet } from 'react-helmet-async';
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader';

// Import all slides
import { CoverSlide } from '@/components/onboarding/slides/CoverSlide';
import { TableOfContentsSlide } from '@/components/onboarding/slides/TableOfContentsSlide';
import { WelcomeSlide } from '@/components/onboarding/slides/WelcomeSlide';
import { OurStandardSlide } from '@/components/onboarding/slides/OurStandardSlide';
import { WhoWeAreSlide } from '@/components/onboarding/slides/WhoWeAreSlide';
import { RoleDefinitionSlide } from '@/components/onboarding/slides/RoleDefinitionSlide';
import { YourOnlyJobSlide } from '@/components/onboarding/slides/YourOnlyJobSlide';
import { WhyThisModelSlide } from '@/components/onboarding/slides/WhyThisModelSlide';
import { ScriptPhilosophySlide } from '@/components/onboarding/slides/ScriptPhilosophySlide';
import { ApprovedScriptSlide } from '@/components/onboarding/slides/ApprovedScriptSlide';
import { ScriptRulesSlide } from '@/components/onboarding/slides/ScriptRulesSlide';
import { QuickReferenceSlide } from '@/components/onboarding/slides/QuickReferenceSlide';
import { CustomerEligibilitySlide } from '@/components/onboarding/slides/CustomerEligibilitySlide';
import { HowMetricsWorkSlide } from '@/components/onboarding/slides/HowMetricsWorkSlide';
import { ExpectationsSlide } from '@/components/onboarding/slides/ExpectationsSlide';
import { HowTopRepsWinSlide } from '@/components/onboarding/slides/HowTopRepsWinSlide';
import { IncentivesSlide } from '@/components/onboarding/slides/IncentivesSlide';
import { InstallPayoutRulesSlide } from '@/components/onboarding/slides/InstallPayoutRulesSlide';
import { SupportStatementSlide } from '@/components/onboarding/slides/SupportStatementSlide';
import { LeadershipDirectorySlide } from '@/components/onboarding/slides/LeadershipDirectorySlide';
import { OnboardingChecklistSlide } from '@/components/onboarding/slides/OnboardingChecklistSlide';
import { ApprovedMaterialsSlide } from '@/components/onboarding/slides/ApprovedMaterialsSlide';
import { FieldUseRulesSlide } from '@/components/onboarding/slides/FieldUseRulesSlide';

import { GHLSlide } from '@/components/onboarding/slides/GHLSlide';
import { TrainingScheduleSlide } from '@/components/onboarding/slides/TrainingScheduleSlide';
import { ClosingSlide } from '@/components/onboarding/slides/ClosingSlide';

export default function FieldRepOnboarding() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Field Rep Onboarding | Select Source Water</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Field Rep Welcome Guide - Select Source Water" />
      </Helmet>

      <OnboardingHeader onPrint={handlePrint} />

      <main className="pt-16 print:pt-0">
        {/* Section 1: Identity & Welcome */}
        <CoverSlide />
        <TableOfContentsSlide />
        <WelcomeSlide />
        <OurStandardSlide />
        <WhoWeAreSlide />

        {/* Section 2: The Role */}
        <RoleDefinitionSlide />
        <YourOnlyJobSlide />
        <WhyThisModelSlide />

        {/* Section 3: Script & Standards */}
        <ScriptPhilosophySlide />
        <ApprovedScriptSlide />
        <ScriptRulesSlide />
        <QuickReferenceSlide />
        <CustomerEligibilitySlide />

        {/* Section 4: Performance & Rewards */}
        <HowMetricsWorkSlide />
        <ExpectationsSlide />
        <HowTopRepsWinSlide />
        <IncentivesSlide />
        <InstallPayoutRulesSlide />

        {/* Section 5: Support & Leadership */}
        <SupportStatementSlide />
        <LeadershipDirectorySlide />
        <OnboardingChecklistSlide />

        {/* Section 6: Marketing Materials */}
        <ApprovedMaterialsSlide />
        <FieldUseRulesSlide />
        

        {/* Section 7: Training & Tools */}
        <GHLSlide />
        <TrainingScheduleSlide />
        <ClosingSlide />
      </main>
    </>
  );
}
