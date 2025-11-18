import React from 'react';
import useActiveSection from '../hooks/useActiveSection';

interface NavItem {
  name: string;
  href: string;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  navItems: NavItem[];
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, navItems, children }) => {
  const activeId = useActiveSection(navItems.map(item => item.href.substring(1)));

  return (
    <>
      <section className="bg-secondary pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-6">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-text-primary text-center">
            {title}
          </h1>
          <p className="mt-4 text-base text-text-muted text-center">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/4 lg:sticky lg:top-28 self-start">
              <h3 className="font-poppins font-bold text-lg text-text-primary mb-4">On this page</h3>
              <nav>
                <ul className="space-y-2">
                  {navItems.map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`block text-text-muted hover:text-primary transition-colors py-1 border-l-2 ${
                          activeId === item.href.substring(1)
                            ? 'border-primary text-primary font-semibold pl-4'
                            : 'border-transparent hover:border-gray-300 pl-4'
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-card border border-gray-200 space-y-8 text-text-muted leading-relaxed">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalPageLayout;