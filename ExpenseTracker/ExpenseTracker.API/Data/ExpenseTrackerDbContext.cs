using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Data
{
    public class ExpenseTrackerDbContext : IdentityDbContext<IdentityUser>
    {
        public ExpenseTrackerDbContext(DbContextOptions<ExpenseTrackerDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Notification> Notifications { get; set; }
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

            // Composite key for ExpenseTag
            modelBuilder.Entity<ExpenseTag>().HasKey(et => new { et.ExpenseID, et.TagID });

            // Relationships with IdentityUser
            modelBuilder.Entity<Expense>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(e => e.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Income>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(i => i.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Budget>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Notification>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(n => n.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Transaction>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Goal>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(g => g.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Subscription>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<RecurringExpense>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(re => re.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Settings>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            // Other Relationships
            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Category)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CategoryID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Currency)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CurrencyID);

            modelBuilder.Entity<Income>()
                .HasOne(i => i.Currency)
                .WithMany(c => c.Incomes)
                .HasForeignKey(i => i.CurrencyID);

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.Currency)
                .WithMany(c => c.Subscriptions)
                .HasForeignKey(s => s.CurrencyID);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.RecurringExpense)
                .WithMany()
                .HasForeignKey(e => e.RecurringExpenseID)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Budgets)
                .HasForeignKey(b => b.CategoryID);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.PaymentMethod)
                .WithMany(p => p.Transactions)
                .HasForeignKey(t => t.PaymentMethodID)
                .OnDelete(DeleteBehavior.NoAction);

            // Indexes
            modelBuilder.Entity<Expense>()
                .HasIndex(e => e.Date);

            // Decimal precision and scale
            modelBuilder.Entity<Budget>()
                .Property(b => b.Limit)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Expense>()
                .Property(e => e.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Goal>()
                .Property(g => g.TargetAmount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Income>()
                .Property(i => i.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<RecurringExpense>()
                .Property(re => re.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Subscription>()
                .Property(s => s.Cost)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasColumnType("decimal(18,2)");

            // Seeding Roles
            var userRoleId = "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6";
            var adminRoleId = "p6o5n4m3-l2k1-j0i9-h8g7-f6e5d4c3b2a1";

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = userRoleId,
                    ConcurrencyStamp = userRoleId,
                    Name = "User",
                    NormalizedName = "USER"
                },
                new IdentityRole
                {
                    Id = adminRoleId,
                    ConcurrencyStamp = adminRoleId,
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}









/*using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Data
{
    public class ExpenseTrackerDbContext: DbContext
    {

        public ExpenseTrackerDbContext(DbContextOptions<ExpenseTrackerDbContext> dbContextOptions): base(dbContextOptions)
        {
            
        }

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

            // Composite key for ExpenseTag
            modelBuilder.Entity<ExpenseTag>().HasKey(et => new { et.ExpenseID, et.TagID });

            // Relationships
            modelBuilder.Entity<Expense>()
                .HasOne(e => e.User)
                .WithMany(u => u.Expenses)
                .HasForeignKey(e => e.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Income>()
                .HasOne(i => i.User)
                .WithMany(u => u.Incomes)
                .HasForeignKey(i => i.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.User)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Goal>()
                .HasOne(g => g.User)
                .WithMany(u => u.Goals)
                .HasForeignKey(g => g.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<RecurringExpense>()
                .HasOne(re => re.User)
                .WithMany(u => u.RecurringExpenses)
                .HasForeignKey(re => re.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<AuditLog>()
                .HasOne(a => a.User)
                .WithMany(u => u.AuditLogs)
                .HasForeignKey(a => a.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Category)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CategoryID)
                .OnDelete(DeleteBehavior.Restrict); 

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Currency)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CurrencyID);

            modelBuilder.Entity<Income>()
                .HasOne(i => i.Currency)
                .WithMany(c => c.Incomes)
                .HasForeignKey(i => i.CurrencyID);

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.Currency)
                .WithMany(c => c.Subscriptions)
                .HasForeignKey(s => s.CurrencyID);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.RecurringExpense)
                .WithMany()
                .HasForeignKey(e => e.RecurringExpenseID)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Budgets)
                .HasForeignKey(b => b.CategoryID);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.PaymentMethod)
                .WithMany(p => p.Transactions)
                .HasForeignKey(t => t.PaymentMethodID)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Settings>()
                .HasOne(s => s.User)
                .WithMany(u => u.Settings)
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.NoAction); 

            // Indexes
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Expense>()
                .HasIndex(e => e.Date);

            // Decimal precision and scale
            modelBuilder.Entity<Budget>()
                .Property(b => b.Limit)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Expense>()
                .Property(e => e.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Goal>()
                .Property(g => g.TargetAmount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Income>()
                .Property(i => i.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<RecurringExpense>()
                .Property(re => re.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Subscription>()
                .Property(s => s.Cost)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasColumnType("decimal(18,2)");
        }




    }
}*/
