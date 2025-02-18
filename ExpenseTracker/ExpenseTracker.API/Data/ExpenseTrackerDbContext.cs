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

        //test


        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }


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


            //test

            modelBuilder.Entity<Team>().HasData(
                new Team { TeamId = 1, Name = "FC Barcelona" },
                new Team { TeamId = 2, Name = "PSG" }
                );

            modelBuilder.Entity<Player>().HasData(
                new Player { PlayerId = 1, Name = "Lionel Messi", Number = "30", BirthYear = 1987, TeamId = 1 },
                new Player { PlayerId = 2, Name = "Cristiano Ronaldo", Number = "30", BirthYear = 1980, TeamId = 2 }
                );

            //modelBuilder.Entity<Player>()
            //        .HasOne(p => p.Team)
            //        .WithMany()
            //        .HasForeignKey(e => e.TeamId)
            //        .OnDelete(DeleteBehavior.NoAction);

            // Composite key for ExpenseTag
            modelBuilder.Entity<ExpenseTag>().HasKey(et => new { et.ExpenseID, et.TagID });

            // Relationships for all entities referencing IdentityUser
            ConfigureUserRelationships(modelBuilder);

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
                    .OnDelete(DeleteBehavior.NoAction);

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
            ConfigureDecimalPrecision(modelBuilder);

            // Seeding Roles
            SeedRoles(modelBuilder);
        }

        private static void ConfigureUserRelationships(ModelBuilder modelBuilder)
        {
            // Define relationships for entities that reference IdentityUser
            modelBuilder.Entity<Expense>()
                .HasOne<IdentityUser>(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Income>()
                .HasOne<IdentityUser>(i => i.User)
                .WithMany()
                .HasForeignKey(i => i.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Budget>()
                .HasOne<IdentityUser>(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Notification>()
                .HasOne<IdentityUser>(n => n.User)
                .WithMany()
                .HasForeignKey(n => n.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transaction>()
                .HasOne<IdentityUser>(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Goal>()
                .HasOne<IdentityUser>(g => g.User)
                .WithMany()
                .HasForeignKey(g => g.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Subscription>()
                .HasOne<IdentityUser>(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RecurringExpense>()
                .HasOne<IdentityUser>(re => re.User)
                .WithMany()
                .HasForeignKey(re => re.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Settings>()
                .HasOne<IdentityUser>(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.Cascade);
        }

        private static void ConfigureDecimalPrecision(ModelBuilder modelBuilder)
        {
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

        private static void SeedRoles(ModelBuilder modelBuilder)
        {
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
