using Microsoft.EntityFrameworkCore;

namespace ReactPeopleBackend.Data
{
    public class PeopleDbContext : DbContext
    {
        private string _connectionString;

        public PeopleDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Person> People { get; set; }
    }

}