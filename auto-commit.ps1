# Auto-commit script for anatokismos-calculator
# Run this script to automatically commit changes to GitHub

param(
    [string]$CommitMessage = "Auto-commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "🚀 Auto-commit script for anatokismos-calculator" -ForegroundColor Green
Write-Host "Watching for changes and auto-committing..." -ForegroundColor Yellow

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git not initialized. Running git init..." -ForegroundColor Red
    git init
    git remote add origin https://github.com/vlasvar/anatokismos-calculator.git
}

# Check if remote exists
$remotes = git remote -v
if ($remotes -notlike "*origin*") {
    Write-Host "➕ Adding remote origin..." -ForegroundColor Yellow
    git remote add origin https://github.com/vlasvar/anatokismos-calculator.git
}

# Add all changes
Write-Host "📁 Adding all changes..." -ForegroundColor Cyan
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Committing changes: $CommitMessage" -ForegroundColor Green
    git commit -m $CommitMessage
    
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Green
    git push origin main
    
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 Vercel will automatically deploy in 1-2 minutes" -ForegroundColor Cyan
} else {
    Write-Host "ℹ️ No changes to commit" -ForegroundColor Yellow
}

Write-Host "✨ Done!" -ForegroundColor Green 