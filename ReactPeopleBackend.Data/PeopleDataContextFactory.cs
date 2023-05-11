using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactPeopleBackend.Data
{
    public class PeopleDataContextFactory : IDesignTimeDbContextFactory<PeopleDbContext>
    {
        public PeopleDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactPeopleBackend.Web"))
               .AddJsonFile("appsettings.json")
               .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new PeopleDbContext(config.GetConnectionString("ConStr"));
        }
    }
}