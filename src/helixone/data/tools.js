const dbData = [
  { name: "Ensembl", url: "https://www.ensembl.org/", desc: "A comprehensive genome browser for vertebrate genomes that supports research in comparative genomics, evolution, and sequence variation." },
  { name: "GenBank", url: "https://www.ncbi.nlm.nih.gov/genbank/", desc: "An annotated collection of all publicly available DNA sequences maintained by the NIH." },
  { name: "UCSC Genome Browser", url: "https://genome.ucsc.edu/", desc: "Provides reference sequences and working draft assemblies for a large collection of genomes." },
  { name: "RefSeq", url: "https://www.ncbi.nlm.nih.gov/refseq/", desc: "A comprehensive, integrated, non-redundant, well-annotated set of reference sequences including genomic, transcript, and protein." },
  { name: "GENCODE", url: "https://www.gencodegenes.org/", desc: "A project mapping all protein-coding genes, non-coding genes, and pseudogenes in the human and mouse genomes." },
  { name: "dbSNP", url: "https://www.ncbi.nlm.nih.gov/snp/", desc: "A free public archive for genetic variation within and across different species." },
  { name: "ClinVar", url: "https://www.ncbi.nlm.nih.gov/clinvar/", desc: "A freely accessible, public archive of reports of the relationships among human variations and phenotypes, with supporting evidence." },
  { name: "gnomAD", url: "https://gnomad.broadinstitute.org/", desc: "The Genome Aggregation Database, seeking to aggregate and harmonize exome and genome sequencing data from large-scale projects." },
  { name: "COSMIC", url: "https://cancer.sanger.ac.uk/cosmic", desc: "The Catalogue of Somatic Mutations in Cancer, the world's largest and most comprehensive resource for exploring the impact of somatic mutations in human cancer." },
  { name: "Gene Expression Omnibus (GEO)", url: "https://www.ncbi.nlm.nih.gov/geo/", desc: "A public functional genomics data repository supporting MIAME-compliant data submissions." },
  { name: "GTEx", url: "https://gtexportal.org/", desc: "The Genotype-Tissue Expression (GTEx) project studies human gene expression and regulation in diverse tissues." },
  { name: "ArrayExpress", url: "https://www.ebi.ac.uk/arrayexpress/", desc: "A database of functional genomics experiments that can be queried and the data downloaded." },
  { name: "OrthoDB", url: "https://www.orthodb.org/", desc: "The hierarchical catalog of orthologs across hundreds of species." },
  { name: "HomoloGene", url: "https://www.ncbi.nlm.nih.gov/homologene/", desc: "An automated system for constructing putative homology groups from the completely sequenced genomes of eukaryotic species." },
  { name: "Ensembl Compara", url: "https://www.ensembl.org/info/genome/compara/", desc: "Provides cross-species resources and analyses, at both the sequence level and the gene level." },
  { name: "HGNC", url: "https://www.genenames.org/", desc: "The HUGO Gene Nomenclature Committee, responsible for approving unique symbols and names for human loci." },
  { name: "OMIM", url: "https://www.omim.org/", desc: "Online Mendelian Inheritance in Man, a comprehensive, authoritative compendium of human genes and genetic phenotypes." },
  { name: "TCGA", url: "https://www.cancer.gov/tcga", desc: "The Cancer Genome Atlas program generated multi-dimensional maps of key genomic changes in 33 types of cancer." },
  { name: "GDC", url: "https://portal.gdc.cancer.gov/", desc: "The Genomic Data Commons provides the cancer research community with a unified data repository that enables data sharing." },
  { name: "cBioPortal", url: "https://www.cbioportal.org/", desc: "Provides visualization, analysis and download of large-scale cancer genomics data sets." },
  { name: "ENCODE", url: "https://www.encodeproject.org/", desc: "The Encyclopedia of DNA Elements project aims to identify all functional elements in the human and mouse genomes." },
  { name: "NCBI", url: "https://www.ncbi.nlm.nih.gov/", desc: "The National Center for Biotechnology Information advances science and health by providing access to biomedical and genomic information." },
  { name: "Genomic Data Commons", url: "https://portal.gdc.cancer.gov/", desc: "GDC empowers researchers by providing a unified data repository that enables data sharing across cancer genomic studies." },
  { name: "DIGITAL Expression Explorer 2", url: "http://dee2.io/", desc: "A repository of uniformly processed RNA-seq data from human, mouse, rat, drosophila, zebrafish and arabidopsis." }
];

export const databases = dbData.map((db, index) => ({
  id: `db-${index + 1}`,
  name: db.name,
  description: db.desc,
  category: 'database',
  websiteUrl: db.url
}));

const predData = [
  { name: "Ensembl VEP", url: "https://www.ensembl.org/Tools/VEP", desc: "Variant Effect Predictor evaluates the effect of your variants on genes, transcripts, and protein sequence." },
  { name: "DAVID", url: "https://david.ncifcrf.gov/", desc: "Provides a comprehensive set of functional annotation tools to understand biological meaning behind large list of genes." },
  { name: "STRING", url: "https://string-db.org/", desc: "A database of known and predicted protein-protein interactions." },
  { name: "UCSC Genome Browser", url: "https://genome.ucsc.edu/", desc: "Interactive visualization and analysis tools for genomic data." },
  { name: "Cytoscape", url: "https://cytoscape.org/", desc: "An open source software platform for visualizing complex networks and integrating these with any type of attribute data." },
  { name: "IGV", url: "https://software.broadinstitute.org/software/igv/", desc: "Integrative Genomics Viewer is a high-performance visualization tool for interactive exploration of large, integrated genomic datasets." },
  { name: "SIFT", url: "https://sift.bii.a-star.edu.sg/", desc: "Sorts Intolerant From Tolerant algorithm predicts whether an amino acid substitution affects protein function." },
  { name: "PolyPhen-2", url: "http://genetics.bwh.harvard.edu/pph2/", desc: "A tool which predicts possible impact of an amino acid substitution on the structure and function of a human protein." },
  { name: "CADD", url: "https://cadd.gs.washington.edu/", desc: "Combined Annotation Dependent Depletion is a tool for scoring the deleteriousness of single nucleotide variants." },
  { name: "MutationTaster", url: "https://www.mutationtaster.org/", desc: "Evaluates the pathogenic potential of DNA sequence alterations." },
  { name: "DeepSEA", url: "http://deepsea.princeton.edu/", desc: "A deep learning-based algorithmic framework for predicting the chromatin effects of sequence alterations." },
  { name: "BIRD", url: "https://bird.bioinfolab.org/", desc: "Predicts regulatory effects of noncoding variants using epigenetic data." },
  { name: "FunSeq2", url: "http://funseq2.gersteinlab.org/", desc: "An integrated tool to identify high-impact noncoding variants." },
  { name: "RegulomeDB", url: "https://regulomedb.org/", desc: "A database that annotates SNPs with known and predicted regulatory elements in the intergenic regions of the human genome." },
  { name: "GWAVA", url: "https://www.sanger.ac.uk/tool/gwava/", desc: "Genome-Wide Annotation of Variants predicts the functional impact of noncoding genetic variants." },
  { name: "SpliceAI", url: "https://spliceailookup.broadinstitute.org/", desc: "A deep learning-based tool to predict splice junctions from an arbitrary pre-mRNA transcript sequence." },
  { name: "MaxEntScan", url: "http://hollywood.mit.edu/burgelab/maxent/Xmaxentscan_scoreseq.html", desc: "A tool for scoring 5' and 3' splice sites based on Maximum Entropy Modeling." },
  { name: "DisGeNET", url: "https://www.disgenet.org/", desc: "A discovery platform containing one of the largest publicly available collections of genes and variants associated with human diseases." },
  { name: "AlphaFold", url: "https://alphafold.ebi.ac.uk/", desc: "An AI system developed by Google DeepMind that predicts a protein's 3D structure from its amino acid sequence." },
  { name: "AlphaGenome", url: "https://alphagenome.com/", desc: "Genomic structural analysis and prediction platform." },
  { name: "FoldX", url: "https://foldxsuite.crg.eu/", desc: "A computer algorithm designed to evaluate the effect of mutations on the stability, folding, and dynamics of proteins and nucleic acids." },
  { name: "Reactome", url: "https://reactome.org/", desc: "A free, open-source, curated and peer-reviewed pathway database." },
  { name: "GeneMark", url: "http://exon.gatech.edu/GeneMark/", desc: "A suite of gene prediction tools developed for finding protein-coding genes in genomic DNA." },
  { name: "AUGUSTUS", url: "http://bioinf.uni-greifswald.de/augustus/", desc: "A program that predicts genes in eukaryotic genomic sequences." },
  { name: "ORF Finder", url: "https://www.ncbi.nlm.nih.gov/orffinder/", desc: "Searches for newly discovered DNA sequences and identifies all open reading frames." },
  { name: "GENSCAN", url: "http://hollywood.mit.edu/GENSCAN.html", desc: "A program designed to predict complete gene structures in genomic DNA." },
  { name: "GeneScout", url: "https://genescout.gi.ucsc.edu/", desc: "A computational platform for the discovery of novel genetic elements." },
  { name: "Helixer", url: "https://helixer.mpi-cbg.de/", desc: "A deep learning framework for accurate cross-species genome annotation." },
  { name: "OMArk", url: "https://omark.readthedocs.io/", desc: "Software for quality assessment of genome annotations based on orthology." }
];

export const predictionTools = predData.map((tool, index) => ({
  id: `pred-${index + 1}`,
  name: tool.name,
  description: tool.desc,
  category: 'prediction',
  websiteUrl: tool.url
}));

export const allTools = [...databases, ...predictionTools];

export const getToolById = (id) => allTools.find(tool => tool.id === id);
