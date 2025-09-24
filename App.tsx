import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import CategoriesPage from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import FeaturesPage from "./pages/Features";
import RecipesPage from "./pages/Recipes";
import RecipeDetailPage from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import FavoritesPage from "./pages/Favorites";
import CountriesListPage from "./pages/CountriesList";
import CountryRecipesPage from "./pages/CountryRecipes";
import SubscriptionPage from "./pages/Subscription";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Page transition component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("page-enter");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("page-exit-active");
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("page-enter");
      }, 300);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === "page-enter") {
      setTimeout(() => {
        setTransitionStage("page-enter-active");
      }, 10);
    }
  }, [transitionStage, displayLocation]);

  return (
    <div className={transitionStage}>
      {children}
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  
  // Check if user comes from subscription page with successful subscription
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscribed') === 'true') {
      localStorage.setItem('isSubscribed', 'true');
      // Remove the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/countries" element={<CountriesListPage />} />
          <Route path="/country/:country" element={<CountryRecipesPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <ScrollToTop />
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
