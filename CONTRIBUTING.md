# Contributing to DevFlow

Thank you for your interest in contributing to DevFlow! 🎉 We're excited to have you join our community of developers who are passionate about creating better development workflows.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Community Guidelines](#community-guidelines)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- **Be respectful** and inclusive of differing viewpoints and experiences
- **Be collaborative** and constructive in discussions
- **Be patient** with newcomers and help them learn
- **Focus on what's best** for the community and the project
- **Show empathy** towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or personal attacks
- Trolling, insulting comments, or inflammatory language
- Publishing others' private information without permission
- Any conduct that could reasonably be considered inappropriate

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:

- **Node.js 18+** installed
- **Git** configured with your GitHub account
- A **Firebase account** for testing
- A **Google Cloud account** for AI features (optional for most contributions)
- Basic knowledge of **React**, **Next.js**, and **TypeScript**

### First-Time Contributors

New to open source? Welcome! Here are some good first issues to start with:

- Documentation improvements
- UI/UX enhancements
- Bug fixes with clear reproduction steps
- Adding unit tests
- Accessibility improvements

Look for issues labeled `good first issue` or `beginner-friendly`.

## 🛠️ Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/yourusername/devflow.git
cd devflow

# Add the original repository as upstream
git remote add upstream https://github.com/originalowner/devflow.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file with the required environment variables (see README.md for details).

### 4. Start Development Server

```bash
npm run dev
```

### 5. Verify Setup

- Open http://localhost:3000
- Create a test account
- Try creating a project and adding a code snippet

## 🎯 How to Contribute

### Types of Contributions We Welcome

**Follow the ROADMAP file for bugs and new features**

1. **🐛 Bug Fixes**

   - Fix issues reported in GitHub Issues
   - Improve error handling
   - Fix edge cases

2. **✨ New Features**

   - Implement features from our roadmap
   - Propose new functionality (discuss first!)
   - Enhance existing features

3. **📚 Documentation**

   - Improve README and guides
   - Add code comments
   - Create tutorials or examples

4. **🎨 UI/UX Improvements**

   - Enhance visual design
   - Improve accessibility
   - Mobile responsiveness fixes

5. **⚡ Performance Optimizations**

   - Reduce bundle size
   - Improve loading times
   - Database query optimizations

6. **🧪 Testing**
   - Add unit tests
   - Add integration tests
   - Improve test coverage

### Before You Start

1. **Check existing issues** - Someone might already be working on it
2. **Create an issue** - For new features or significant changes
3. **Discuss your approach** - Get feedback before implementing
4. **Start small** - Begin with smaller contributions to get familiar

## 🔄 Pull Request Process

### 1. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Write clean, readable code
- Follow our coding standards
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when available)
npm test

# Test the build
npm run build
```

### 4. Commit Your Changes

Follow conventional commit format:

```bash
# Examples:
git commit -m "feat: add AI-powered snippet search"
git commit -m "fix: resolve project deletion bug"
git commit -m "docs: update installation guide"
git commit -m "style: improve mobile responsive design"
```

### 5. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

### 6. PR Requirements

Your PR should include:

- **Clear title and description** explaining what and why
- **Screenshots** for UI changes
- **Testing steps** for reviewers
- **Updated documentation** if needed
- **Linked issues** using keywords (fixes #123)

### 7. Code Review Process

- **Automated checks** must pass (linting, type-checking, build)
- **At least one maintainer** must approve
- **Address feedback** promptly and respectfully
- **Keep discussions** focused and constructive

## 📝 Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Define proper types** - avoid `any`
- **Export interfaces** for reusable types
- **Use strict mode** settings

```typescript
// Good
interface ProjectData {
  title: string;
  description: string;
  status: ProjectStatus;
}

// Avoid
const data: any = { ... };
```

### React Components

- **Use functional components** with hooks
- **Implement proper TypeScript props**
- **Use forwardRef** when needed
- **Keep components small** and focused

```tsx
// Good
interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button className={cn("btn", `btn-${variant}`)} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Styling

- **Use Tailwind CSS** classes
- **Use the cn() utility** for conditional classes
- **Follow mobile-first** responsive design
- **Use CSS variables** for theming

```tsx
// Good
<div
  className={cn(
    "flex items-center gap-2 p-4",
    isActive && "bg-primary text-primary-foreground",
    "sm:p-6 md:gap-4"
  )}
/>
```

### File Organization

- **Group related files** in appropriate directories
- **Use descriptive names** for files and folders
- **Export from index files** when appropriate
- **Follow existing patterns**

```
src/
├── components/
│   ├── ui/           # Base UI components
│   ├── projects/     # Project-specific components
│   └── navigation/   # Navigation components
├── lib/
│   ├── actions/      # Server actions
│   ├── types.ts      # Type definitions
│   └── utils.ts      # Utility functions
```

## 🧪 Testing Guidelines

### Testing Philosophy

- **Test behavior, not implementation**
- **Focus on user interactions**
- **Test error scenarios**
- **Keep tests simple and readable**

### Writing Tests

```typescript
// Example test structure
describe("ProjectCard", () => {
  it("displays project title and description", () => {
    // Arrange
    const project = { title: "Test Project", description: "Test desc" };

    // Act
    render(<ProjectCard project={project} />);

    // Assert
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Test desc")).toBeInTheDocument();
  });
});
```

### Test Coverage

Focus on testing:

- **Critical user flows** (authentication, project creation)
- **Complex logic** (status management, AI integration)
- **Error handling** (network failures, validation)
- **Accessibility** (keyboard navigation, screen readers)

## 📖 Documentation Guidelines

### Code Comments

- **Explain why, not what**
- **Document complex algorithms**
- **Add JSDoc for public APIs**
- **Keep comments up-to-date**

```typescript
/**
 * Generates smart tags for code snippets using AI analysis
 * @param codeSnippet - The code to analyze
 * @returns Promise resolving to suggested tags
 */
export async function generateSmartTags(
  codeSnippet: string
): Promise<string[]> {
  // Use Gemini AI to analyze code patterns and suggest relevant tags
  // This helps users organize their snippets more effectively
  return await aiTaggingFlow({ codeSnippet });
}
```

### README Updates

When adding features:

- **Update the features list**
- **Add usage examples**
- **Update screenshots** if UI changes
- **Mention breaking changes**

## 🐛 Issue Guidelines

### Reporting Bugs

Use the bug report template and include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (browser, OS, Node version)
- **Console errors** if any

### Feature Requests

Use the feature request template and include:

- **Problem statement** - what problem does this solve?
- **Proposed solution** - how would you like it to work?
- **Alternatives considered** - what other approaches did you think of?
- **Additional context** - mockups, examples, etc.

### Issue Labels

We use these labels to organize issues:

- `bug` - Something isn't working correctly
- `enhancement` - New feature or improvement
- `good first issue` - Great for newcomers
- `help wanted` - Looking for contributors
- `priority: high` - Needs immediate attention
- `priority: low` - Nice to have
- `ui/ux` - Design-related issues
- `documentation` - Documentation improvements

## 🌟 Community Guidelines

### Getting Help

- **Check existing issues** and discussions first
- **Be specific** about your problem
- **Provide context** and relevant details
- **Be patient** - maintainers contribute in their free time

### Helping Others

- **Be welcoming** to newcomers
- **Share your knowledge** generously
- **Point to relevant resources**
- **Follow up** on your suggestions

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Pull Request Comments** - Code review and technical discussions

## 🎖️ Recognition

We appreciate all contributions! Contributors will be:

- **Listed in our README** contributors section
- **Mentioned in release notes** for significant contributions
- **Invited to join** our contributors team (for regular contributors)

## 📞 Questions?

If you have questions about contributing:

1. Check this guide and the README
2. Search existing GitHub Issues and Discussions
3. Create a new Discussion with the `question` tag
4. Reach out to maintainers in your PR or issue

Thank you for helping make DevFlow better for all developers! 🚀

---

_Happy coding!_ ❤️
