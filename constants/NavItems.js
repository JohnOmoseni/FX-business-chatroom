import {
  ArrowPathIcon,
  Bars3Icon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  InformationCircleIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export const navItems = [
  {
    link: "Solutions",
    id: "solutions",
    icon: ChartBarIcon,
    dropdown: [
      {
        link: "Personalized AI",
        href: "/solutions/personalized",
        icon: ChartBarIcon,
      },
      {
        link: "Predictive Modeling",
        href: "/solutions/modeling",
        icon: CursorArrowRaysIcon,
      },
      {
        link: "Marketing and Sales",
        href: "/solutions/marketing",
        icon: ShieldCheckIcon,
      },
      {
        link: "Forecasting and planning",
        href: "/solutions/forecast",
        icon: Squares2X2Icon,
      },
      {
        link: "Fraud and security",
        href: "/solutions/fraud",
        icon: ArrowPathIcon,
      },
      {
        link: "Cost",
        href: "/solutions/cost",
        icon: ArrowPathIcon,
      },
      {
        link: "Churn",
        href: "/solutions/churn",
        icon: ArrowPathIcon,
      },
      {
        link: "Follow",
        href: "/solutions/follow",
        icon: ArrowPathIcon,
      },
      {
        link: "Predict",
        href: "/solutions/predict",
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    link: "Resources",
    id: "resources",
    icon: Bars3Icon,
    dropdown: [
      {
        link: "Blog",
        href: "/resources/blogs",
        icon: PencilSquareIcon,
      },
      {
        link: "Documentation",
        href: "/resources/blogs",
        icon: DocumentTextIcon,
      },
      {
        link: "Events",
        href: "/resources/events",
        icon: CalendarDaysIcon,
      },
      {
        link: "Resource Library",
        href: "/resources/library",
        icon: BuildingLibraryIcon,
      },
    ],
  },
  {
    link: "Company",
    id: "company",
    icon: InformationCircleIcon,
    dropdown: [
      {
        link: "About us",
        href: "/about",
        icon: InformationCircleIcon,
      },
      {
        link: "Contact us",
        href: "/contact",
        icon: DevicePhoneMobileIcon,
      },
      {
        link: "Careers",
        href: "/careers",
        icon: BriefcaseIcon,
      },
      {
        link: "Press",
        href: "/press",
        icon: NewspaperIcon,
      },
    ],
  },
];
