import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import Hero from '../components/home/Hero'
import WhyChoose from '../components/home/WhyChoose'
import Stats from '../components/home/Stats'
import ServicesPreview from '../components/home/ServicesPreview'
import HowItWorks from '../components/home/HowItWorks'
import Fleet from '../components/home/Fleet'
import Testimonials from '../components/home/Testimonials'
import CtaBanner from '../components/home/CtaBanner'

export default function Home() {
  return (
    <PageWrap>
      <Seo page="home" />
      <Hero />
      <WhyChoose />
      <Stats />
      <ServicesPreview />
      <HowItWorks />
      <Fleet />
      <Testimonials />
      <CtaBanner />
    </PageWrap>
  )
}
