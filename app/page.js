import Hero from "@/components/Hero";
import AboutTeaser from "@/components/AboutTeaser";
import SkillsMarquee from "@/components/SkillsMarquee";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestArticles from "@/components/LatestArticles";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <SkillsMarquee />
      <FeaturedProjects />
      <LatestArticles />
      <ContactCTA />
    </>
  );
}