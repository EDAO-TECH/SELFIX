import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ArrowLeft, Info, User, CalendarDays, Fingerprint, FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Meta from '@/components/Meta';

const PublicationDetailPage = ({ showToast }) => {
  const { publicationSlug } = useParams();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublication = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from('publications')
          .select('*')
          .eq('slug', publicationSlug)
          .single();

        if (dbError) throw dbError;
        if (!data) throw new Error("Publication not found.");
        setPublication(data);
      } catch (err) {
        setError(err.message);
        showToast(`Error fetching publication: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (publicationSlug) {
      fetchPublication();
    }
  }, [publicationSlug, showToast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg text-muted-foreground">Loading Publication Details...</p>
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Meta title="Publication Not Found" />
        <p className="text-lg text-destructive">
          {error ? `Failed to load publication: ${error}` : "Publication not found."}
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/publications">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Publications
          </Link>
        </Button>
      </div>
    );
  }

  const pageTitle = `${publication.title} - SELFIX Publications`;
  const pageDescription = publication.abstract || `Read the official SELFIX publication: ${publication.title}.`;

  return (
    <>
      <Meta title={pageTitle} description={pageDescription} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild variant="outline" className="mb-8 group">
            <Link to="/publications">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to All Publications
            </Link>
          </Button>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-glow mb-3">
            {publication.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-10">{publication.publication_code}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-lg cyber-border-soft">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-primary">
                  <FileText className="mr-3 h-6 w-6" /> Document Viewer
                </CardTitle>
              </CardHeader>
              <CardContent>
                {publication.pdf_url ? (
                  <div className="aspect-[8.5/11] w-full bg-slate-900/50 rounded-md overflow-hidden border border-border">
                    <iframe
                      src={publication.pdf_url} 
                      className="w-full h-full"
                      title={`${publication.title} PDF Viewer`}
                      allowFullScreen
                    >
                      Your browser does not support embedded PDFs. You can <a href={publication.pdf_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">download the PDF directly</a>.
                    </iframe>
                  </div>
                ) : (
                  <div className="aspect-[8.5/11] w-full bg-slate-900/50 rounded-md flex items-center justify-center border border-border">
                    <p className="text-muted-foreground">PDF preview not available.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-lg sticky top-24 cyber-border-soft">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-primary">
                  <Info className="mr-3 h-6 w-6" /> Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center"><User className="mr-2 h-4 w-4" />Author</h3>
                  <p className="text-foreground">{publication.author || 'DAOCORE/SELFIX'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center"><CalendarDays className="mr-2 h-4 w-4" />Publication Date</h3>
                  <p className="text-foreground">{new Date(publication.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center"><Fingerprint className="mr-2 h-4 w-4" />DAO Signature</h3>
                  <p className="text-foreground break-all text-xs">{publication.dao_signature || 'Not Available'}</p>
                </div>
                 <div>
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center"><FileText className="mr-2 h-4 w-4" />License</h3>
                  <p className="text-foreground">{publication.license || 'SmartLicense-X™'}</p>
                </div>
                {publication.abstract && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Abstract</h3>
                    <p className="text-foreground text-sm leading-relaxed">{publication.abstract}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-border">
                  {publication.pdf_url ? (
                    <Button asChild size="lg" className="w-full">
                      <a href={publication.pdf_url} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-5 w-5" /> Download PDF
                      </a>
                    </Button>
                  ) : (
                    <Button size="lg" className="w-full" disabled>
                      <Download className="mr-2 h-5 w-5" /> PDF Unavailable
                    </Button>
                  )}
                  {publication.ipfs_hash && (
                    <Button asChild variant="outline" size="lg" className="w-full mt-3">
                      <a href={`https://ipfs.io/ipfs/${publication.ipfs_hash}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" /> View on IPFS
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PublicationDetailPage;