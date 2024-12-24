using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Data
{
    public class ExpenseTrackerDbContext: DbContext
    {

        public ExpenseTrackerDbContext(DbContextOptions<ExpenseTrackerDbContext> dbContextOptions): base(dbContextOptions)
        {
            
        }

        //test
        public DbSet<Difficulty> Difficulties { get; set; }

        public DbSet<Region> Regions { get; set; }

        public DbSet<Walk> Walks { get; set; }

        public DbSet<Image> Images { get; set; }

        //real
        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ExpenseTag> ExpenseTags { get; set; }
        public DbSet<RecurringExpense> RecurringExpenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ExpenseTag>()
                .HasKey(et => new { et.ExpenseID, et.TagID });

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.User)
                .WithMany(u => u.Expenses)
                .HasForeignKey(e => e.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Income>()
                .HasOne(i => i.User)
                .WithMany(u => u.Incomes)
                .HasForeignKey(i => i.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.User)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Goal>()
                .HasOne(g => g.User)
                .WithMany(u => u.Goals)
                .HasForeignKey(g => g.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RecurringExpense>()
                .HasOne(re => re.User)
                .WithMany(u => u.RecurringExpenses)
                .HasForeignKey(re => re.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AuditLog>()
                .HasOne(a => a.User)
                .WithMany(u => u.AuditLogs)
                .HasForeignKey(a => a.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Category)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CategoryID)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Currency)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CurrencyID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Income>()
                .HasOne(i => i.Currency)
                .WithMany(c => c.Incomes)
                .HasForeignKey(i => i.CurrencyID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.Currency)
                .WithMany(c => c.Subscriptions)
                .HasForeignKey(s => s.CurrencyID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.RecurringExpense)
                .WithMany() 
                .HasForeignKey(e => e.RecurringExpenseID)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Budgets)
                .HasForeignKey(b => b.CategoryID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transaction>()
    .HasOne(t => t.PaymentMethod)
    .WithMany(p => p.Transactions)
    .HasForeignKey(t => t.PaymentMethodID)
    .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Settings>()
                .HasOne(s => s.User)
                .WithMany(u => u.Settings)
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Expense>()
                .HasIndex(e => e.Date);
        }


    }
}
