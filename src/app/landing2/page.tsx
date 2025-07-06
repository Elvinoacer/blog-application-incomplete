// app/page.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  PenSquare,
  Headphones,
  DollarSign,
  BookOpen,
  ArrowRight,
  Star,
  Users,
  Bookmark,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const featuredArticles = [
    {
      title: "The Future of AI in Content Creation",
      excerpt:
        "Exploring how artificial intelligence is transforming the writing industry.",
      category: "Technology",
      readTime: "8 min read",
    },
    {
      title: "Monetizing Your Passion for Writing",
      excerpt:
        "Practical strategies to turn your writing skills into a sustainable income.",
      category: "Business",
      readTime: "10 min read",
    },
    {
      title: "Podcasting 101: Equipment Guide for Beginners",
      excerpt:
        "Everything you need to start your podcasting journey on a budget.",
      category: "Podcasting",
      readTime: "6 min read",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Active Readers" },
    { value: "2,500+", label: "Published Authors" },
    { value: "50,000+", label: "Monthly Articles" },
    { value: "5,000+", label: "Podcast Episodes" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MindScribe</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent"></div>
        </div>

        <div className="container px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Where <span className="text-primary">Great Minds</span> Share
              Their Ideas
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Discover insightful articles, listen to engaging podcasts, and
              share your own knowledge with the world. Get paid for your
              creativity.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="gap-2">
                Start Reading <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Become an Author <PenSquare className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 rounded-xl border shadow-lg overflow-hidden bg-background"
          >
            <div className="aspect-video w-full relative">
              <Image
                src={
                  theme === "dark"
                    ? "https://images.unsplash.com/photo-1746304153031-c98a7f27bbae?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : "/light-banner.jpg"
                }
                alt="Blog platform showcase"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </h3>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose MindScribe?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our platform is designed for both readers and creators, offering
              the best experience for everyone.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:border-primary transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Quality Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access thousands of well-researched articles and podcasts
                    across various topics, curated for your interests.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:border-primary transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <PenSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Easy Publishing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our intuitive editor makes publishing articles and podcasts
                    simple, with built-in formatting tools and analytics.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:border-primary transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Earn Money</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get paid for your content through our revenue sharing
                    program, memberships, and tipping system.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Articles
            </h2>
            <p className="mt-4 text-muted-foreground">
              Discover some of our most popular content from talented authors
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            {featuredArticles.map((article, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={`/article-${index + 1}.jpg`}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardHeader>
                    <span className="text-sm font-medium text-primary">
                      {article.category}
                    </span>
                    <CardTitle>{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{article.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {article.readTime}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Read <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button variant="outline" className="gap-2">
              View All Articles <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* For Authors Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="relative rounded-xl overflow-hidden border shadow-lg">
                <div className="aspect-[4/3] w-full relative">
                  <Image
                    src="/author-dashboard.jpg"
                    alt="Author dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Become an Author Today
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join our community of creators and start sharing your knowledge
                with the world. Whether you're an experienced writer or just
                starting out, we provide the tools you need to succeed.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 mt-1">
                    <PenSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Easy Publishing</h3>
                    <p className="text-sm text-muted-foreground">
                      Our intuitive editor makes writing and formatting articles
                      a breeze.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 mt-1">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Podcast Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload and host your podcast episodes directly on our
                      platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 mt-1">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Multiple Revenue Streams</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn through ads, subscriptions, tips, and our partner
                      program.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 gap-2">
                Start Writing Now <PenSquare className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our Community Says
            </h2>
            <p className="mt-4 text-muted-foreground">
              Hear from our readers and authors about their experiences
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="italic">
                      "MindScribe has completely transformed how I share my
                      knowledge. The platform is intuitive, the community is
                      engaged, and I'm earning more than I ever did on other
                      platforms."
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Sarah Johnson</h4>
                        <p className="text-sm text-muted-foreground">
                          Tech Writer & Podcaster
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/10 to-transparent"></div>
        </div>

        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-background/80 backdrop-blur-sm p-8 md:p-12 rounded-xl border shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Join Our Community?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you want to read great content or share your own
              knowledge, we've got you covered.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Sign Up Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Learn More <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MindScribe</h3>
              <p className="text-sm text-muted-foreground">
                Empowering creators and readers through quality content.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">For Readers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Browse Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discover Podcasts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Membership
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">For Authors</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Start Writing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Monetization
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Creator Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <div className="flex gap-2">
                <Input placeholder="Your email" />
                <Button size="sm">Subscribe</Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Get the latest articles and updates delivered to your inbox.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2023 MindScribe. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
