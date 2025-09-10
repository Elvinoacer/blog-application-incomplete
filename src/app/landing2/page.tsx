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
  Menu,
  X,
  Search,
  Mic,
  Play,
  Clock,
  Heart,
  Share,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      likes: 243,
      comments: 42,
    },
    {
      title: "Monetizing Your Passion for Writing",
      excerpt:
        "Practical strategies to turn your writing skills into a sustainable income.",
      category: "Business",
      readTime: "10 min read",
      likes: 187,
      comments: 31,
    },
    {
      title: "Podcasting 101: Equipment Guide for Beginners",
      excerpt:
        "Everything you need to start your podcasting journey on a budget.",
      category: "Podcasting",
      readTime: "6 min read",
      likes: 156,
      comments: 28,
    },
  ];

  const stats = [
    { value: "10,000+", label: "Active Readers", icon: Users },
    { value: "2,500+", label: "Published Authors", icon: PenSquare },
    { value: "50,000+", label: "Monthly Articles", icon: BookOpen },
    { value: "5,000+", label: "Podcast Episodes", icon: Headphones },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Writer & Podcaster",
      content:
        "MindScribe has completely transformed how I share my knowledge. The platform is intuitive, the community is engaged, and I'm earning more than I ever did on other platforms.",
      rating: 5,
      avatar: "/avatars/sarah.jpg",
    },
    {
      name: "Michael Chen",
      role: "Business Consultant",
      content:
        "As a reader, I've found incredible value in the quality of content here. The recommendation algorithm understands my interests perfectly.",
      rating: 5,
      avatar: "/avatars/michael.jpg",
    },
    {
      name: "Jessica Williams",
      role: "Lifestyle Blogger",
      content:
        "The publishing tools are fantastic! I can focus on writing while the platform handles formatting and distribution seamlessly.",
      rating: 5,
      avatar: "/avatars/jessica.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Discover
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              For Authors
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Podcasts
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" className="hidden md:block">
                Sign In
              </Button>
              <Button className="hidden md:block">Get Started</Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container px-4 py-4 space-y-4">
              <a href="#" className="block py-2 font-medium">
                Discover
              </a>
              <a href="#" className="block py-2 font-medium">
                For Authors
              </a>
              <a href="#" className="block py-2 font-medium">
                Podcasts
              </a>
              <a href="#" className="block py-2 font-medium">
                Pricing
              </a>
              <div className="pt-4 border-t flex flex-col gap-3">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent"></div>

          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
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
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Where <span className="text-primary">Great Minds</span> Share
              Their Ideas
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto"
            >
              Discover insightful articles, listen to engaging podcasts, and
              share your own knowledge with the world. Get paid for your
              creativity.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="gap-2 px-8 py-4 text-base">
                Start Reading <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 py-4 text-base"
              >
                Become an Author <PenSquare className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Search bar for mobile */}
            <motion.div variants={fadeInUp} className="mt-8 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles, podcasts, topics..."
                  className="pl-10 pr-4 py-5 rounded-full"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1 h-10 w-10 rounded-full"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 rounded-2xl border shadow-lg overflow-hidden bg-background max-w-4xl mx-auto"
          >
            <div className="aspect-video w-full relative">
              <Image
                src={
                  theme === "dark"
                    ? "https://images.unsplash.com/photo-1746304153031-c98a7f27bbae?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Blog platform showcase"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-sm font-medium bg-primary px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <h3 className="text-xl font-bold mt-2">
                    The Art of Digital Storytelling
                  </h3>
                  <p className="text-sm opacity-90 mt-1">
                    Learn how to craft compelling narratives in the digital age
                  </p>
                </div>
              </div>
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
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
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
            <h2 className="text-3xl font-bold sm:text-4xl">
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
            className="mt-16 grid md:grid-cols-3 gap-6 md:gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
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
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
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
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
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
            <h2 className="text-3xl font-bold sm:text-4xl">
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
            className="mt-16 grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {featuredArticles.map((article, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-md">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-15${
                        index + 1
                      }174671293?q=80&w=1470&auto=format&fit=crop`}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{article.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {article.readTime}
                      </span>
                      <div className="flex items-center gap-3">
                        <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm">
                          <Heart className="h-4 w-4" /> {article.likes}
                        </button>
                        <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm">
                          <Share className="h-4 w-4" />
                        </button>
                      </div>
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
            <Button variant="outline" className="gap-2 rounded-full px-6">
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
              <div className="relative rounded-2xl overflow-hidden border shadow-lg">
                <div className="aspect-[4/3] w-full relative">
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop"
                    alt="Author dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating stats card */}
                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Earnings this month</p>
                      <p className="text-lg font-bold">$2,458.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold sm:text-4xl">
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

              <Button className="mt-8 gap-2 rounded-full px-6">
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
            <h2 className="text-3xl font-bold sm:text-4xl">
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
            className="mt-16 grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-md overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="italic text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <Users className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
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

      {/* Podcast Section */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Featured Podcasts
            </h2>
            <p className="mt-4 text-muted-foreground">
              Listen to engaging conversations from industry experts
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="relative h-40 w-40 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1589903308904-d969a5ad15d9?q=80&w=1470&auto=format&fit=crop"
                    alt="Podcast cover"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-white mb-4">
                  New Episode
                </span>
                <h3 className="text-2xl font-bold">
                  The Future of Digital Content
                </h3>
                <p className="text-muted-foreground mt-2">
                  Join us as we discuss the evolving landscape of digital
                  content creation with industry leaders.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Button className="rounded-full gap-2">
                    <Play className="h-4 w-4" /> Play Episode
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
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
            className="max-w-3xl mx-auto text-center bg-background/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl border shadow-lg"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Join Our Community?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you want to read great content or share your own
              knowledge, we've got you covered.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 rounded-full px-8">
                Sign Up Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full px-8"
              >
                Learn More <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/20">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">MindScribe</span>
              </div>
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
                <Input placeholder="Your email" className="rounded-full" />
                <Button size="sm" className="rounded-full">
                  Subscribe
                </Button>
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

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
