<?php

namespace App\Command;

use App\AppBundle\Service\UserService;
use App\BaseBundle\Enum\UserRole;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:create-admin',
    description: 'seed default admin user',
)]
class SeedAdminCommand extends Command
{
    public function __construct(
        private UserService $userService
    )
    {
        parent::__construct();
    }

    /**
     * Summary of execute
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        if($this->isAdminExist()) {
            $output->writeln('admin already exist');
            return Command::FAILURE;
        }

        $newAdmin = $this->userService->createUser(UserRole::Admin);
        $newAdmin = $this->userService->save($newAdmin);
        $output->writeln(
            printf('admin user created with the email %s', $newAdmin->getEmail())
        );

        return Command::SUCCESS;
    }

    /**
     * Summary of isAdminExist
     * @return bool
     */
    private function isAdminExist(): bool {
        $admin = $this->userService->getAdmin();

        return !is_null($admin);
    }
}