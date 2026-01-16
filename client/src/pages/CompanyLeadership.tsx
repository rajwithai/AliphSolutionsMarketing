import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Award, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';
import useSEO from '@/hooks/useSEO';

export default function CompanyLeadership() {
  const { t } = useTranslation();
  useSEO({
    title: 'Leadership | Aliph Solutions',
    description: 'Meet the advisory, technical, and delivery leadership behind Aliph Solutions—combining regulatory expertise, sovereign architecture, and AI governance.',
    keywords: 'Aliph Solutions leadership, Saudi compliance experts, GRC advisory team, sovereign AI architects',
  });

  const leaders = [
    {
      name: t('companyLeadership.team.leader1Name'),
      role: t('companyLeadership.team.leader1Role'),
      credentials: [
        t('companyLeadership.team.leader1Cred1'),
        t('companyLeadership.team.leader1Cred2'),
        t('companyLeadership.team.leader1Cred3')
      ]
    },
    {
      name: t('companyLeadership.team.leader2Name'),
      role: t('companyLeadership.team.leader2Role'),
      credentials: [
        t('companyLeadership.team.leader2Cred1'),
        t('companyLeadership.team.leader2Cred2'),
        t('companyLeadership.team.leader2Cred3')
      ]
    },
    {
      name: t('companyLeadership.team.leader3Name'),
      role: t('companyLeadership.team.leader3Role'),
      credentials: [
        t('companyLeadership.team.leader3Cred1'),
        t('companyLeadership.team.leader3Cred2'),
        t('companyLeadership.team.leader3Cred3')
      ]
    },
    {
      name: t('companyLeadership.team.leader4Name'),
      role: t('companyLeadership.team.leader4Role'),
      credentials: [
        t('companyLeadership.team.leader4Cred1'),
        t('companyLeadership.team.leader4Cred2'),
        t('companyLeadership.team.leader4Cred3')
      ]
    }
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[65vh] bg-gradient-to-br from-[#0B1220] via-[#1a1f35] to-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A227] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-[#C9A227]" />
              <span className="text-sm text-[#C9A227]">{t('companyLeadership.hero.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('companyLeadership.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              {t('companyLeadership.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/company/contact'}
                className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
              >
                {t('companyLeadership.hero.btn1')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/advisory'}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('companyLeadership.hero.btn2')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t('companyLeadership.team.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {t('companyLeadership.team.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {leaders.map((leader, idx) => (
              <Card key={idx} className="p-8 border-2 hover:border-[#C9A227] transition-all hover:shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#C9A227]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                    <p className="text-[#C9A227] font-semibold">{leader.role}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {leader.credentials.map((cred, credIdx) => (
                    <li key={credIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{cred}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY BOARD */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
            {t('companyLeadership.advisoryNetwork.title')}
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('companyLeadership.advisoryNetwork.description')}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { area: t('companyLeadership.advisoryNetwork.area1Title'), desc: t('companyLeadership.advisoryNetwork.area1Desc') },
              { area: t('companyLeadership.advisoryNetwork.area2Title'), desc: t('companyLeadership.advisoryNetwork.area2Desc') },
              { area: t('companyLeadership.advisoryNetwork.area3Title'), desc: t('companyLeadership.advisoryNetwork.area3Desc') }
            ].map((advisor, idx) => (
              <Card key={idx} className="p-6 text-center border-2 hover:border-[#C9A227] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{advisor.area}</h3>
                <p className="text-sm text-gray-600">{advisor.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATING PRINCIPLES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            {t('companyLeadership.principles.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              t('companyLeadership.principles.principle1'),
              t('companyLeadership.principles.principle2'),
              t('companyLeadership.principles.principle3'),
              t('companyLeadership.principles.principle4'),
              t('companyLeadership.principles.principle5'),
              t('companyLeadership.principles.principle6')
            ].map((principle, idx) => (
              <Card key={idx} className="p-6 border-2 hover:border-[#C9A227] transition-all">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] mb-3" />
                <p className="text-gray-700">{principle}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B1220] to-[#1a1f35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('companyLeadership.finalCta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('companyLeadership.finalCta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = '/company/contact'}
              className="bg-gradient-to-r from-[#C9A227] to-[#B8921F] hover:from-[#B8921F] hover:to-[#A8821D]"
            >
              {t('companyLeadership.finalCta.btn1')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/deliverables'}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('companyLeadership.finalCta.btn2')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
