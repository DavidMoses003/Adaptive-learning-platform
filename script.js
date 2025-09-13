// Lucide Icons (simplified version)
const icons = {
  Upload: '📁',
  FileText: '📄',
  Brain: '🧠',
  BarChart3: '📊',
  Target: '🎯',
  CheckCircle: '✅',
  Clock: '⏰',
  TrendingUp: '📈',
  Sparkles: '✨',
  BookOpen: '📖',
  Award: '🏆',
  Zap: '⚡'
};

class LearningPlatform {
  constructor() {
    this.uploadedFiles = [];
    this.processingStatus = 'idle';
    this.selectedFile = null;
    this.currentTab = 'upload';
    
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const app = document.getElementById('root');
    
    app.innerHTML = `
      <div class="min-h-screen bg-background">
        <!-- Hero Section -->
        <div class="relative overflow-hidden">
          <div class="gradient-hero absolute inset-0 opacity-10"></div>
          <div class="relative px-6 py-24 text-center">
            <div class="mx-auto max-w-4xl">
              <div class="ai-badge mb-6 animate-pulse-slow inline-flex items-center">
                <span class="mr-2">${icons.Sparkles}</span>
                AI-Powered Learning
              </div>
              
              <h1 class="mb-6 text-5xl font-bold tracking-tight">
                Adaptive Learning Platform
              </h1>
              
              <p class="mb-8 text-xl text-muted-foreground leading-relaxed">
                Create a personalized study system with document processing, automated assessment generation, 
                progress analytics, and AI-driven study recommendations.
              </p>
              
              <div class="flex justify-center gap-4 flex-wrap">
                <button class="btn-primary">
                  <span class="mr-2">${icons.Upload}</span>
                  Start Learning
                </button>
                <button class="btn-outline">
                  <span class="mr-2">${icons.BarChart3}</span>
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Platform Interface -->
        <div class="px-6 py-12">
          <div class="mx-auto max-w-7xl">
            <div class="space-y-8">
              <div class="tab-list">
                <button class="tab-trigger ${this.currentTab === 'upload' ? 'active' : ''}" data-tab="upload">
                  <span class="mr-2">${icons.Upload}</span>
                  Document Processing
                </button>
                <button class="tab-trigger ${this.currentTab === 'assessment' ? 'active' : ''}" data-tab="assessment">
                  <span class="mr-2">${icons.Target}</span>
                  Assessment Generation
                </button>
                <button class="tab-trigger ${this.currentTab === 'analytics' ? 'active' : ''}" data-tab="analytics">
                  <span class="mr-2">${icons.BarChart3}</span>
                  Progress Analytics
                </button>
                <button class="tab-trigger ${this.currentTab === 'recommendations' ? 'active' : ''}" data-tab="recommendations">
                  <span class="mr-2">${icons.Brain}</span>
                  AI Recommendations
                </button>
              </div>

              <div id="tab-content">
                ${this.renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderTabContent() {
    switch (this.currentTab) {
      case 'upload':
        return this.renderUploadTab();
      case 'assessment':
        return this.renderAssessmentTab();
      case 'analytics':
        return this.renderAnalyticsTab();
      case 'recommendations':
        return this.renderRecommendationsTab();
      default:
        return this.renderUploadTab();
    }
  }

  renderUploadTab() {
    return `
      <div class="grid gap-6 md:grid-cols-2">
        <div class="learning-card">
          <div class="mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2 mb-2">
              <span>${icons.FileText}</span>
              Upload Documents
            </h3>
            <p class="text-sm text-muted-foreground">
              Upload your study materials for AI-powered processing and analysis
            </p>
          </div>
          <div class="space-y-4">
            <div class="border-2 border-dashed border-border rounded-lg p-8 text-center transition-smooth hover:border-primary/50">
              <div class="text-4xl mb-4">${icons.Upload}</div>
              <p class="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                class="hidden"
                id="file-upload"
              />
              <label for="file-upload" class="btn-outline cursor-pointer inline-block">
                Choose Files
              </label>
            </div>
            
            ${this.processingStatus === 'processing' ? `
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm">
                  <span class="animate-spin">${icons.Clock}</span>
                  Processing documents...
                </div>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: 65%"></div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="learning-card">
          <div class="mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2 mb-2">
              <span>${icons.CheckCircle}</span>
              Processed Files
            </h3>
            <p class="text-sm text-muted-foreground">
              Files ready for assessment generation and study recommendations
            </p>
          </div>
          <div class="space-y-2">
            ${this.uploadedFiles.length === 0 ? 
              '<p class="text-sm text-muted-foreground">No files uploaded yet</p>' :
              this.uploadedFiles.map((file, index) => `
                <div class="flex items-center justify-between p-3 rounded-lg bg-secondary/50 cursor-pointer transition-smooth hover:bg-secondary" data-file="${file}">
                  <div class="flex items-center gap-3">
                    <span>${icons.FileText}</span>
                    <span class="text-sm font-medium">${file}</span>
                  </div>
                  <div class="badge-success badge">
                    <span class="mr-1">${icons.CheckCircle}</span>
                    Processed
                  </div>
                </div>
              `).join('')
            }
          </div>
        </div>
      </div>
    `;
  }

  renderAssessmentTab() {
    return `
      <div class="grid gap-6 md:grid-cols-3">
        <div class="learning-card">
          <div class="mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2 mb-2">
              <span>${icons.Target}</span>
              Generate Quiz
            </h3>
            <p class="text-sm text-muted-foreground">
              AI-generated questions based on your documents
            </p>
          </div>
          <button class="btn-primary w-full" id="generate-quiz" ${this.uploadedFiles.length === 0 ? 'disabled' : ''}>
            <span class="mr-2">${icons.Zap}</span>
            Generate Quiz
          </button>
          <p class="text-xs text-muted-foreground mt-2">
            ${this.uploadedFiles.length} documents available
          </p>
        </div>

        <div class="learning-card">
          <div class="mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2 mb-2">
              <span>${icons.BookOpen}</span>
              Flashcards
            </h3>
            <p class="text-sm text-muted-foreground">
              Key concepts extracted from your materials
            </p>
          </div>
          <button class="btn-outline w-full" ${this.uploadedFiles.length === 0 ? 'disabled' : ''}>
            <span class="mr-2">${icons.Brain}</span>
            Create Flashcards
          </button>
        </div>

        <div class="learning-card">
          <div class="mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2 mb-2">
              <span>${icons.Award}</span>
              Practice Test
            </h3>
            <p class="text-sm text-muted-foreground">
              Comprehensive assessment for mastery
            </p>
          </div>
          <button class="btn-outline w-full" ${this.uploadedFiles.length === 0 ? 'disabled' : ''}>
            <span class="mr-2">${icons.Target}</span>
            Generate Test
          </button>
        </div>
      </div>

      ${this.processingStatus === 'complete' && this.uploadedFiles.length > 0 ? `
        <div class="learning-card animate-float">
          <div class="mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <span>${icons.Sparkles}</span>
              Generated Assessment Ready!
            </h3>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 rounded-lg bg-accent/10">
              <span class="font-medium">Multiple Choice Quiz</span>
              <div class="ai-badge">15 Questions</div>
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-success/10">
              <span class="font-medium">Key Concepts Review</span>
              <div class="badge">8 Topics</div>
            </div>
            <button class="btn-primary w-full mt-4">
              Start Assessment
            </button>
          </div>
        </div>
      ` : ''}
    `;
  }

  renderAnalyticsTab() {
    return `
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div class="learning-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Study Streak</p>
              <p class="text-2xl font-bold">12 Days</p>
            </div>
            <div class="progress-ring">
              <span class="text-2xl p-2 block text-white">${icons.TrendingUp}</span>
            </div>
          </div>
        </div>

        <div class="learning-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Accuracy Rate</p>
              <p class="text-2xl font-bold">87%</p>
            </div>
            <div class="progress-ring">
              <span class="text-2xl p-2 block text-white">${icons.Target}</span>
            </div>
          </div>
          <div class="progress-bar mt-2">
            <div class="progress-bar-fill" style="width: 87%"></div>
          </div>
        </div>

        <div class="learning-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Topics Mastered</p>
              <p class="text-2xl font-bold">24</p>
            </div>
            <div class="progress-ring">
              <span class="text-2xl p-2 block text-white">${icons.Award}</span>
            </div>
          </div>
        </div>

        <div class="learning-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Study Time</p>
              <p class="text-2xl font-bold">4.2h</p>
            </div>
            <div class="progress-ring">
              <span class="text-2xl p-2 block text-white">${icons.Clock}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="learning-card">
        <div class="mb-4">
          <h3 class="text-lg font-semibold">Learning Progress</h3>
          <p class="text-sm text-muted-foreground">Your performance across different subjects</p>
        </div>
        <div class="space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Mathematics</span>
              <span class="text-sm text-muted-foreground">92%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: 92%"></div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Science</span>
              <span class="text-sm text-muted-foreground">78%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: 78%"></div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">History</span>
              <span class="text-sm text-muted-foreground">85%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: 85%"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderRecommendationsTab() {
    return `
      <div class="learning-card">
        <div class="mb-4">
          <h3 class="text-lg font-semibold flex items-center gap-2">
            <span>${icons.Brain}</span>
            AI Study Recommendations
          </h3>
          <p class="text-sm text-muted-foreground">
            Personalized suggestions based on your learning patterns and performance
          </p>
        </div>
        <div class="space-y-4">
          <div class="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div class="flex items-start gap-3">
              <div class="progress-ring flex-shrink-0">
                <span class="text-sm p-1 block text-white">${icons.Sparkles}</span>
              </div>
              <div class="flex-1">
                <h4 class="font-medium mb-1">Focus on Weak Areas</h4>
                <p class="text-sm text-muted-foreground mb-3">
                  Your Science performance could improve. Try spending 20 more minutes daily on chemistry concepts.
                </p>
                <button class="btn-outline text-sm px-4 py-2">
                  Start Chemistry Review
                </button>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-success/10 border border-success/20">
            <div class="flex items-start gap-3">
              <div class="progress-ring flex-shrink-0">
                <span class="text-sm p-1 block text-white">${icons.TrendingUp}</span>
              </div>
              <div class="flex-1">
                <h4 class="font-medium mb-1">Maintain Your Streak</h4>
                <p class="text-sm text-muted-foreground mb-3">
                  Great job on your 12-day streak! Keep up the momentum with today's recommended 30-minute session.
                </p>
                <button class="btn-primary text-sm px-4 py-2">
                  Continue Streak
                </button>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div class="flex items-start gap-3">
              <div class="progress-ring flex-shrink-0">
                <span class="text-sm p-1 block text-white">${icons.Target}</span>
              </div>
              <div class="flex-1">
                <h4 class="font-medium mb-1">Practice Advanced Topics</h4>
                <p class="text-sm text-muted-foreground mb-3">
                  You've mastered the basics in Mathematics. Ready to tackle advanced calculus problems?
                </p>
                <button class="btn-outline text-sm px-4 py-2">
                  View Advanced Topics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="learning-card">
          <div class="mb-4">
            <h3 class="text-lg font-semibold">Optimal Study Schedule</h3>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-2 rounded bg-secondary/50">
              <span class="text-sm">Morning (9-11 AM)</span>
              <div class="badge">Mathematics</div>
            </div>
            <div class="flex items-center justify-between p-2 rounded bg-secondary/50">
              <span class="text-sm">Afternoon (2-4 PM)</span>
              <div class="badge">Science</div>
            </div>
            <div class="flex items-center justify-between p-2 rounded bg-secondary/50">
              <span class="text-sm">Evening (7-8 PM)</span>
              <div class="badge">Review</div>
            </div>
          </div>
        </div>

        <div class="learning-card">
          <div class="mb-4">
            <h3 class="text-lg font-semibold">Learning Style Analysis</h3>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm">Visual Learning</span>
              <span class="text-sm font-medium">85%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: 85%"></div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">Kinesthetic Learning</span>
              <span class="text-sm font-medium">60%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: 60%"></div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">Auditory Learning</span>
              <span class="text-sm font-medium">45%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: 45%"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-trigger').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.currentTab = e.currentTarget.dataset.tab;
        this.render();
        this.attachEventListeners();
      });
    });

    // File upload
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files) {
          const fileNames = Array.from(files).map(file => file.name);
          this.uploadedFiles = [...this.uploadedFiles, ...fileNames];
          this.processingStatus = 'processing';
          this.render();
          this.attachEventListeners();

          // Simulate processing
          setTimeout(() => {
            this.processingStatus = 'complete';
            this.render();
            this.attachEventListeners();
          }, 2000);
        }
      });
    }

    // Generate quiz
    const generateQuizBtn = document.getElementById('generate-quiz');
    if (generateQuizBtn) {
      generateQuizBtn.addEventListener('click', () => {
        this.processingStatus = 'processing';
        this.render();
        this.attachEventListeners();

        setTimeout(() => {
          this.processingStatus = 'complete';
          this.render();
          this.attachEventListeners();
        }, 1500);
      });
    }

    // File selection
    document.querySelectorAll('[data-file]').forEach(fileElement => {
      fileElement.addEventListener('click', (e) => {
        this.selectedFile = e.currentTarget.dataset.file;
        // Add visual feedback for selected file
        document.querySelectorAll('[data-file]').forEach(el => el.classList.remove('bg-primary/10'));
        e.currentTarget.classList.add('bg-primary/10');
      });
    });
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new LearningPlatform();
});
