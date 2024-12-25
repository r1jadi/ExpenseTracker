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

        public DbSet<User> Users { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            

        }




    }
}
