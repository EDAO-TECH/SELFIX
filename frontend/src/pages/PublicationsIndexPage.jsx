import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, ExternalLink, Clock, Search, Gavel } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Meta from '@/components/Meta';
import { supabase } from '@/lib/supabaseClient';

const PublicationsIndexPage = ({ showToast }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from('publications')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbError) throw dbError;
        setPublications(data || []);
      } catch (err) {
        setError(err.message);
        showToast(`Error fetching publications: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, [showToast]);

  const filteredPublications = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.publication_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pub.abstract && pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pageTitle = "SELFIX Legal & IP Publications";
  const pageDescription = "Browse official SELFIX IP filings, licenses, receipts, and proofs of ownership. This section is for auditors, lawyers, or investors performing due diligence.";

  return (
    <>
      <Meta title={pageTitle} description={pageDescription} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Gavel className="h-16 w-16 mx-auto text-primary text-glow" />
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-glow">
            Legal & IP Publications
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            This section contains official IP filings, licenses, and proofs of ownership. These documents provide direct proof of filing dates, titles, and inventor records, backing our public claims with legal validation.
          </p>
        </motion.div>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search by title, filing number, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 w-full bg-background/50 border-border focus:ring-primary h-12 rounded-full"
            />
          </div>
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-muted-foreground">Loading Publications...</p>
          </div>
        )}

        {error && (
          <p className="text-center text-destructive text-lg mt-10">Failed to load publications: {error}</p>
        )}

        {!loading && !error && filteredPublications.length === 0 && (
          <p className="text-center text-muted-foreground text-lg mt-10">No publications found matching your search.</p>
        )}

        {!loading && !error && (
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/70 transition-all duration-300 shadow-lg hover:shadow-primary/20 cyber-border-soft">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <CardTitle className="text-2xl font-semibold text-primary flex items-start">
                          <FileText className="mr-3 h-7 w-7 mt-1 flex-shrink-0" />
                          <span>{pub.title}</span>
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground mt-2 ml-10">
                          {pub.publication_code}
                        </CardDescription>
                      </div>
                      {pub.created_at && (
                        <div className="text-xs text-muted-foreground flex items-center mt-1 whitespace-nowrap sm:ml-10">
                          <Clock className="mr-1.5 h-4 w-4" /> Filed: {new Date(pub.created_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3 ml-10">
                      {pub.abstract || "No abstract available."}
                    </p>
                    <div className="flex flex-wrap gap-3 items-center ml-10">
                      {pub.pdf_url ? (
                        <Button asChild variant="outline">
                          <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                          </a>
                        </Button>
                      ) : (
                         <Button variant="outline" disabled>
                            <Download className="mr-2 h-4 w-4" /> PDF Unavailable
                          </Button>
                      )}
                      <Button asChild>
                        <Link to={`/publications/${pub.slug}`}>
                          <ExternalLink className="mr-2 h-4 w-4" /> View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PublicationsIndexPage;